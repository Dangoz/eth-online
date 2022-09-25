import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { tmdbImagePrefixFull, tmdbImagePrefixOriginal } from '@/common/tmdb'
import type { Media, Movie, TV } from '@/types/tmdb'
import { Image } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import ReviewModal from '../review/ReviewModal'
import WorldIDModal from '../navigation/WorldIDModal'
import CustomStyle from '@/styles/custom.module.css'
import ShowInfo from './ShowInfo'
import Spinner from '../ui/Spinner'
import useUser from '@/hooks/useUser'
import useAddress from '@/hooks/useAddress'
import { handleInfo } from '@/common/notification'
import { getPostByProfileIdAndTag } from '@/common/lens/post'
import type { LensPost } from '@/types/lens'

const ShowContainer: React.FC<{ media: Media }> = ({ media }) => {
  const [existingReview, setExistingReview] = useState<LensPost | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showWorldIDModal, setShowWorldIDModal] = useState(false)
  const { isConnected } = useAddress()
  const {
    userStore: { lensAuthenticated, lensProfile },
  } = useUser()

  useEffect(() => {
    if (!lensProfile?.id) {
      return
    }
    const profileId = lensProfile.id
    const tag = `${media.media_type}${media.id}`

    const checkExistingReview = async () => {
      const post = await getPostByProfileIdAndTag(profileId, tag)
      post ? setExistingReview(post) : setExistingReview(null)
    }
    checkExistingReview()
  }, [media, lensProfile])

  const handleReview = async () => {
    if (!isConnected) {
      return handleInfo('Please Connect your Wallet to review')
    }
    if (!lensAuthenticated) {
      return handleInfo('Please Sign in with Lens to review')
    }
    setShowReviewModal(true)
    handleInfo(`You already reviewed this ${media.media_type}, a new review will replace the old one`)
  }

  const handleFavorite = async () => {
    if (!isConnected) {
      return handleInfo('Please Connect your Wallet to review')
    }
    setShowWorldIDModal(true)
  }

  return (
    <>
      <div>
        <div className="relative">
          {/* backdrop img */}
          <img
            src={tmdbImagePrefixFull + (media.backdrop_path || media.poster_path)}
            alt="Cover Image"
            className="w-full h-[80vh] object-cover backdrop-blur-2xl z-10"
          />
          {/* background img blur cover  */}
          <div className={`absolute top-0 left-0 w-full h-[80vh] bg-black bg-opacity-75 z-20`} />
          {/* show info */}
          <div className={`absolute top-0 left-0 w-full h-[80vh] z-30`}>
            <ShowInfo
              media={media}
              handleReview={handleReview}
              handleFavorite={handleFavorite}
              existingReview={existingReview}
            />
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          media={media}
          existingReview={existingReview}
        />
      )}
      <WorldIDModal open={showWorldIDModal} onClose={() => setShowWorldIDModal(false)} />
    </>
  )
}

export default ShowContainer
