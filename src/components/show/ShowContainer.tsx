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
            <ShowInfo media={media} handleReview={handleReview} handleFavorite={handleFavorite} />
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal open={showReviewModal} onClose={() => setShowReviewModal(false)} media={media} />
      )}
      <WorldIDModal open={showWorldIDModal} onClose={() => setShowWorldIDModal(false)} />
    </>
  )
}

export default ShowContainer
