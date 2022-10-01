import { Modal, Button, Loading, Spacer, Textarea, Input } from '@nextui-org/react'
import type { Media } from '@/types/tmdb'
import { handleError, handleSuccess, notifyErrorMessage, handleInfo } from '@/common/notification'
import { tmdbImagePrefixPoster, getMediaTitle, getMediaReleaseDate } from '@/common/tmdb'
import { useEffect, useState } from 'react'
import StarRating from '@/components/ui/StarRating'
import Divider from '@/components/ui/Divider'
import { parseReviewPost } from '@/common/review'
import type { IPFSMetadataInput } from '@/types/nftport'
import type { LensPost, LensPublicationMetadata } from '@/types/lens'
import { PublicationMainFocus } from '@/types/generated/types'
import { LENS_APP_ID, LENSHUB_PROXY_ADDRESS } from '@/common/constants'
import lensHubAbi from '@/abis/LensHubProxy.json'
import { nanoid } from 'nanoid'
import useUser from '@/hooks/useUser'
import nftport from '@/common/nftPort'
import { parseIpfs } from '@/common/utils'
import { createPostTypedData, getPostByTxHash } from '@/common/lens/post'
import { utils as ethersUtils } from 'ethers'
import { useSignTypedData, useContractWrite } from 'wagmi'
import omit from 'lodash.omit'
import { broadcastRelay } from '@/common/lens/relay'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import Router from 'next/router'
import { hidePublication } from '@/common/lens/hide'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  media: Media
  existingReview: LensPost | null
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, media, existingReview }) => {
  const {
    userStore: { lensProfile },
  } = useUser()
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewContent, setReviewContent] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isHidingStale, setIsHidingStale] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isAwaitingSign, setIsAwaitingSign] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)

  const {
    isError: signingError,
    isLoading: isSigning,
    signTypedDataAsync,
    data: signature,
  } = useSignTypedData({
    onError: (error) => notifyErrorMessage((error as any).reason),
  })

  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: LENSHUB_PROXY_ADDRESS,
    contractInterface: lensHubAbi,
    functionName: 'postWithSig',
    onError: (error) => handleError(error),
  })

  const checkEmptyFields = () => {
    if (!rating) {
      return handleInfo('Please rate the movie')
    }

    if (reviewTitle.trim() === '') {
      return handleInfo('Please add a title for your review')
    }

    if (reviewContent.trim() === '') {
      return handleInfo('Please add some content to your review')
    }
    return true
  }

  const handleReviewSubmit = async () => {
    try {
      if (!lensProfile) {
        return
      }
      if (!checkEmptyFields()) {
        return
      }

      // initiate publishing process
      setIsPublishing(true)

      // if there's an existing review, hide it
      if (existingReview) {
        setIsHidingStale(true)
        await hidePublication(existingReview.id)
      }

      // parseReview, upload data to IPFS, then upload metadataURL to Lens
      setIsUploading(true)
      const reviewPost = parseReviewPost({
        mediaName: getMediaTitle(media),
        mediaYear: getMediaReleaseDate(media) || '',
        mediaDescription: media.overview || '',
        reviewRating: rating,
        reviewHeadline: reviewTitle,
        reviewContent,
        mediaType: media.media_type,
        hashTags: ['Review', getMediaTitle(media)],
      })

      console.log(reviewPost)

      const publicationMetadata: LensPublicationMetadata = {
        appId: LENS_APP_ID,
        metadata_id: nanoid(),
        description: reviewPost,
        content: reviewPost,
        name: `Review of ${getMediaTitle(media)} by ${lensProfile?.handle}`,
        version: '2.0.0',
        media: [
          {
            item: tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path),
          },
        ],
        attributes: [],
        external_url: '',
        image: tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path),
        mainContentFocus: PublicationMainFocus.Article,
        locale: 'en',
        tags: [`${media.media_type}${media?.id}`],
        // contentWarning; 'SPOLIER'
      }

      const ipfsMetadata: IPFSMetadataInput = {
        name: publicationMetadata.name,
        description: publicationMetadata.description,
        file_url: ' ',
        // external_url: publicationMetadata.external_url,
        attributes: [],
        custom_fields: {
          ...publicationMetadata,
        },
      }

      const ipfsMetadataOutput = await nftport.uploadMetadata(ipfsMetadata)
      if (!ipfsMetadataOutput) {
        return handleError(new Error('Failed to upload metadata'))
      }
      const metadataURL = ipfsMetadataOutput.metadata_uri
      console.log('metadataURL', metadataURL)

      const result = await createPostTypedData(lensProfile.id, metadataURL)
      if (!result) {
        return handleError(new Error('Failed to create post'))
      }
      const typedData = result.typedData
      const typedId = result.id
      console.log('typedData', typedData)
      console.log('typedId', typedId)

      // sign typed data
      setIsAwaitingSign(true)
      const signature = await signTypedDataAsync({
        domain: omit(typedData.domain, '__typename'),
        types: omit(typedData.types, '__typename'),
        value: omit(typedData.value, '__typename'),
      })
      console.log('signature', signature)

      // finalize transaction through relay or contract
      setIsFinalizing(true)
      const relayResult = await broadcastRelay(typedId, signature)
      console.log('relayResult', relayResult)

      let txHash: string
      if (relayResult) {
        txHash = relayResult
      } else {
        const { v, r, s } = ethersUtils.splitSignature(signature)
        const tx = await writeAsync?.({
          recklesslySetUnpreparedArgs: {
            profileId: typedData.value.profileId,
            contentURI: typedData.value.contentURI,
            collectModule: typedData.value.collectModule,
            collectModuleInitData: typedData.value.collectModuleInitData,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
            sig: {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          },
        })
        console.log('FINALLY', tx.hash)
        txHash = tx.hash
      }

      // request pooling every 3 seconds with a timeout of 15 seconds
      let newReview: LensPost | null = null
      const poolInterval = setInterval(async () => {
        newReview = await getPostByTxHash(txHash)
        if (newReview) {
          handleSuccess('Review Posted Successfully')
          clearInterval(poolInterval)
          Router.push(`/review/${newReview.id}`)
          return onClose()
        }
      }, 3000)
      setTimeout(() => {
        if (newReview) {
          return
        }
        clearInterval(poolInterval)
        handleInfo('Review Posted Successfully, but indexing timedout, please check back later')
        return onClose()
      }, 150000)
    } catch {
      onClose()
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeButton
        blur
        width="500px"
        className="bg-bgBlue"
        preventClose={isPublishing}
      >
        <Modal.Body>
          {!isPublishing && (
            <div className="flex flex-col w-full h-full gap-3">
              {/* media info card */}
              <div className="flex justify-start gap-3 mb-2">
                <img
                  alt="poster"
                  src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
                  className="w-[80px] h-[120px] object-cover"
                />
                <div className="h-[120px] overflow-y-scroll no-scrollbar">
                  <div className="flex gap-2 font-bold">
                    {getMediaTitle(media)}
                    <span className="text-slate-500">{`(${getMediaReleaseDate(media)?.slice(0, 4)})`}</span>
                  </div>
                  <Spacer y={0.25} />
                  <div className="text-[12px]">{media.overview}</div>
                </div>
              </div>

              {/* review form */}
              <div className="font-semibold">YOUR RATING</div>
              <div>
                <div className="flex justify-start items-center gap-3">
                  <StarRating rating={rating} totalRating={10} onChange={(rating) => setRating(rating)} />
                  <div className="text-titlePurple font-bold text-[20px]">{rating}</div>
                </div>
                <Divider />
              </div>

              {/* <Divider /> */}

              <div className="font-semibold">YOUR REVIEW</div>

              <Input
                aria-label="Write a headline for your review here..."
                bordered
                placeholder="Write a headline for your review here..."
                color="secondary"
                value={`${reviewTitle}`}
                onChange={(e) => setReviewTitle(e.target.value)}
              />

              <Textarea
                aria-label="Write your review here..."
                bordered
                maxRows={12}
                color="secondary"
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />

              {/* button options */}
              <div className="flex justify-end">
                <Button onPress={handleReviewSubmit} className="w-[50%] h-[44px] text-[16px] text-white bg-titlePurple">
                  Submit Review
                </Button>
              </div>
            </div>
          )}

          {/* publication transition visual */}
          {isPublishing && (
            <div className="flex flex-col w-full h-full gap-3">
              {/* hiding stale review */}
              {existingReview && (
                <div className="flex justify-start items-center gap-10 p-3 pl-10">
                  <div className="w-[50px] h-[50px] flex justify-center items-center">
                    {!isHidingStale ? (
                      <div className="text-[18px] w-[40px] h-[40px] rounded-[99px] flex items-center justify-center border border-titlePurple">
                        0
                      </div>
                    ) : !isUploading ? (
                      <Loading color={'secondary'} />
                    ) : (
                      <CheckBadgeIcon className="fill-titlePurple" />
                    )}
                  </div>
                  <div className="font-semibold text-[18px]">Deleting Stale Review</div>
                </div>
              )}

              {/* uploading review */}
              <div className="flex justify-start items-center gap-10 p-3 pl-10">
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  {!isUploading ? (
                    <div className="text-[18px] w-[40px] h-[40px] rounded-[99px] flex items-center justify-center border border-titlePurple">
                      1
                    </div>
                  ) : !isAwaitingSign && !isFinalizing ? (
                    <Loading color={'secondary'} />
                  ) : (
                    <CheckBadgeIcon className="fill-titlePurple" />
                  )}
                </div>
                <div className="font-semibold text-[18px]">Uploading Review</div>
              </div>

              {/* awating signature */}
              <div className="flex justify-start items-center gap-10 p-3 pl-10">
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  {!isAwaitingSign ? (
                    <div className="text-[18px] w-[40px] h-[40px] rounded-[99px] flex items-center justify-center border border-titlePurple">
                      2
                    </div>
                  ) : !isFinalizing ? (
                    <Loading color={'secondary'} />
                  ) : (
                    <CheckBadgeIcon className="fill-titlePurple" />
                  )}
                </div>
                <div className="font-semibold text-[18px]">Awaiting Signature</div>
              </div>

              {/* finalizing publication */}
              <div className="flex justify-start items-center gap-10 p-3 pl-10">
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  {!isFinalizing ? (
                    <div className="text-[18px] w-[40px] h-[40px] rounded-[99px] flex items-center justify-center border border-titlePurple">
                      3
                    </div>
                  ) : (
                    <Loading color={'secondary'} />
                  )}
                </div>
                <div className="font-semibold text-[18px]">Finalizing Publication</div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewModal
