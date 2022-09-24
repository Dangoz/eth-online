import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { tmdbImagePrefixFull, tmdbImagePrefixOriginal } from '@/common/tmdb'
import type { Media, Movie, TV } from '@/types/tmdb'
import { Image } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import ReviewModal from '../review/ReviewModal'
import WorldIDModal from '../navigation/WorldIDModal'

const ShowContainer: React.FC<{ media: Media }> = ({ media }) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showWorldIDModal, setShowWorldIDModal] = useState(false)

  const handleReview = async () => {
    setShowReviewModal(true)
  }

  const handleFavorite = async () => {
    setShowWorldIDModal(true)
  }

  return (
    <>
      <div>
        <img
          src={tmdbImagePrefixFull + (media.backdrop_path || media.poster_path)}
          alt="Cover Image"
          className="w-full h-[60vh] object-cover"
        />

        {/* <ShowReviews />  */}

        <div className="flex justify-center w-full flex-col items-center">
          <Button
            color={'gradient'}
            className="gradientBG h-[44px] w-[99px] text-[16px] text-[black]"
            onPress={handleReview}
          >
            Review
          </Button>
          <br />
          <Button
            color={'gradient'}
            className="gradientBG h-[44px] w-[99px] text-[16px] text-[black]"
            onPress={handleFavorite}
          >
            Favorite
          </Button>
        </div>
      </div>

      <ReviewModal open={showReviewModal} onClose={() => setShowReviewModal(false)} media={media} />
      <WorldIDModal open={showWorldIDModal} onClose={() => setShowWorldIDModal(false)} />
    </>
  )
}

export default ShowContainer
