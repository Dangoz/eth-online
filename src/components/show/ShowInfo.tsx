import { Media } from '@/types/tmdb'
import imdb, { getMediaTitle, getMediaReleaseDate, tmdbImagePrefixPoster } from '@/common/tmdb'
import { Spacer } from '@nextui-org/react'
import { PencilSquareIcon, HeartIcon } from '@heroicons/react/24/solid'
import RatingStar from '@/components/icons/RatingStar'
import { useEffect, useState } from 'react'
import { LensPost } from '@/types/lens'

interface ShowInfoProps {
  media: Media
  handleReview: () => void
  handleFavorite: () => void
  existingReview: LensPost | null
}

const ShowInfo: React.FC<ShowInfoProps> = ({ media, handleReview, handleFavorite, existingReview }) => {
  const [rating, setRating] = useState<number | null>(null)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  useEffect(() => {
    const getTrailer = async () => {
      if (!media.id) {
        return
      }
      const key = await imdb.getTrailer(media.id, media.media_type)
      setTrailerKey(key)
    }
    getTrailer()
  }, [media])

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
            className={`w-[44px] h-[44px] gradientBG flex justify-center items-center rounded-[100px] cursor-pointer primaryShadow`}
            onClick={handleFavorite}
          >
            <HeartIcon className={`w-[20px] h-[20px]`} />
          </div>

          <div
            className={`w-[44px] h-[44px] gradientBG flex justify-center items-center rounded-[100px] cursor-pointer primaryShadow`}
            onClick={handleReview}
          >
            <PencilSquareIcon className={`w-[20px] h-[20px] ${existingReview && 'fill-black'}`} />
          </div>
        </div>

        {/* bottom card & rating */}
        <div className="h-[28vh] bg-green-0 flex items-center justify-between pl-1 pr-10">
          <div className="h-[26vh] rounded-[8px] bg-black flex justify-start items-center">
            <img
              alt="poster"
              src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
              className="h-full rounded-l-[8px]"
            />
            <div className="h-full">
              {/* <iframe
                className="w-[400px] h-[26vh] border-collapse rounded-r-[8px]"
                src={`https://www.youtube.com/embed/${trailerKey}?showinfo=0&modestbranding=1&rel=0&autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              /> */}
            </div>
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
