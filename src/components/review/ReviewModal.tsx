import { Modal, Button, Loading, Spacer, Textarea, Input } from '@nextui-org/react'
import type { Media } from '@/types/tmdb'
import { handleError, handleSuccess, notifyErrorMessage } from '@/common/notification'
import { tmdbImagePrefixPoster, getMediaTitle, getMediaReleaseDate } from '@/common/tmdb'
import { useEffect, useState } from 'react'
import StarRating from '@/components/ui/StarRating'
import Divider from '@/components/ui/Divider'
import { parseReviewPost } from '@/common/review'
import type { IPFSMetadataInput } from '@/types/nftport'
import type { LensPublicationMetadata } from '@/types/lens'
import { PublicationMainFocus } from '@/types/generated/types'
import { LENS_APP_ID, LENSHUB_MUMBAI_PROXY_ADDRESS } from '@/common/constants'
import lensHubAbi from '@/abis/LensHubProxy.json'
import { nanoid } from 'nanoid'
import useUser from '@/hooks/useUser'
import nftport from '@/common/nftPort'
import { parseIpfs } from '@/common/utils'
import { createPostTypedData } from '@/common/lens/post'
import { utils as ethersUtils } from 'ethers'
import { useSignTypedData, useContractWrite } from 'wagmi'
import omit from 'lodash.omit'
import { broadcastRelay } from '@/common/lens/relay'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, media }) => {
  const {
    userStore: { lensProfile },
  } = useUser()
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewContent, setReviewContent] = useState('')

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
    addressOrName: LENSHUB_MUMBAI_PROXY_ADDRESS,
    contractInterface: lensHubAbi,
    functionName: 'postWithSig',
    onError: (error) => handleError(error),
  })

  const handleReviewSubmit = async () => {
    try {
      if (!lensProfile) {
        return
      }

      const reviewPost = parseReviewPost({
        mediaName: getMediaTitle(media),
        mediaYear: getMediaReleaseDate(media) || '',
        mediaDescription: media.overview || '',
        reviewRating: rating,
        reviewHeadline: reviewTitle,
        reviewContent,
        mediaType: media.media_type,
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
        tags: [],
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
      const metadata_uri = ipfsMetadataOutput.metadata_uri
      const metadataURL = parseIpfs(metadata_uri)
      console.log('metadataURL', metadataURL)

      const result = await createPostTypedData(lensProfile.id, metadataURL)
      if (!result) {
        return handleError(new Error('Failed to create post'))
      }
      const typedData = result.typedData
      const typedId = result.id
      console.log('typedData', typedData)
      console.log('typedId', typedId)

      const signature = await signTypedDataAsync({
        domain: omit(typedData.domain, '__typename'),
        types: omit(typedData.types, '__typename'),
        value: omit(typedData.value, '__typename'),
      })
      console.log('signature', signature)

      const relayResult = await broadcastRelay(typedId, signature)
      console.log('relayResult', relayResult)
      if (relayResult) {
        handleSuccess('Review Posted Successfully')
        onClose()
        return
      }

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
      if (tx) {
        handleSuccess('Review Posted Successfully')
        onClose()
      }
    } catch {}
  }

  return (
    <>
      <Modal open={open} onClose={onClose} closeButton blur width="500px" className="bg-bgBlue">
        <Modal.Body>
          <div className="flex flex-col w-full h-full gap-3">
            {/* media info card */}
            <div className="flex justify-start gap-3 mb-2">
              <img
                alt="poster"
                src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
                className="w-[80px] h-[120px] object-cover"
              />
              <div className="h-[120px] overflow-y-scroll">
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
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewModal
