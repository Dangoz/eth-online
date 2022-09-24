import { Media } from '@/types/tmdb'
import { getMediaTitle, getMediaReleaseDate, tmdbImagePrefixPoster } from '@/common/tmdb'
import { Spacer } from '@nextui-org/react'
import { PencilSquareIcon, HeartIcon } from '@heroicons/react/24/solid'
import RatingStar from '@/components/icons/RatingStar'
import { useState } from 'react'

interface ShowInfoProps {
  media: Media
  handleReview: () => void
  handleFavorite: () => void
}

const ShowInfo: React.FC<ShowInfoProps> = ({ media, handleReview, handleFavorite }) => {
  const [rating, setRating] = useState<number | null>(null)

  return (
    <>
      <div className="p-10">
        {/* top information */}
        <div className="flex flex-col items-start justify-center h-[35vh]">
          <div className="text-[50px] w-[80%]">
            {getMediaTitle(media)}
            {<span className="text-slate-500 ml-2">{`(${getMediaReleaseDate(media)?.slice(0, 4)})`}</span>}
          </div>
          <div className="text-[30px]">{media?.tagline}</div>
          <Spacer y={1} />
          <div className="text-[18px] w-[50%] overflow-y-scroll">{media?.overview}</div>
        </div>

        {/* middle button options */}
        <div className="h-[7vh] flex justify-start items-start gap-5 pl-5 pt-2">
          <div
            className="w-[40px] h-[40px] gradientBG flex justify-center items-center rounded-[100px] cursor-pointer"
            onClick={handleFavorite}
          >
            <HeartIcon className="w-[16px] h-[16px]" />
          </div>

          <div
            className="w-[40px] h-[40px] gradientBG flex justify-center items-center rounded-[100px] cursor-pointer"
            onClick={handleReview}
          >
            <PencilSquareIcon className="w-[16px] h-[16px]" />
          </div>
        </div>

        {/* bottom card & rating */}
        <div className="h-[28vh] bg-green-0 flex items-center justify-between pl-1 pr-10">
          <div className="w-[400px] h-[26vh] rounded-[8px] bg-black flex justify-start items-center">
            <img
              alt="poster"
              src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
              className="h-full rounded-l-[8px]"
            />
          </div>

          <div className="relative flex justify-center items-center">
            <div>
              <RatingStar />
            </div>
            {rating && <div className="absolute rounded-[8px] text-[50px] mt-2">{rating}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowInfo
