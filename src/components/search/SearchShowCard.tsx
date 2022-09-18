import type { TmdbShow } from '@/types/tmdb'
import { tmdbImagePrefixWide } from '@/common/tmdb'
import React, { useCallback } from 'react'
import { Image } from '@nextui-org/react'
import Router from 'next/router'

const SearchShowCard: React.FC<{ show: TmdbShow }> = ({ show }) => {
  const thumbnailURL =
    !show.backdrop_path && !show.poster_path
      ? '/logo.svg'
      : tmdbImagePrefixWide + (show.poster_path || show.backdrop_path)

  const handleShowClick = useCallback(() => {
    Router.push(`/show/${show.media_type}/${show.id}`)

    // on router push, close modal by clicking background
    document.getElementById('input-modal-background')?.click()
  }, [show])

  return (
    <div onClick={handleShowClick}>
      <div className="w-full flex items-center justify-start p-1 gap-2 cursor-pointer hover:bg-bgGrey">
        <div>
          <Image width={40} height={60} src={thumbnailURL} alt="Default Image" placeholder="blur" />
        </div>
        <div>
          <div>
            {show.title || show.name}{' '}
            <span className=" text-gray-400">{show.release_date && `(${show.release_date.slice(0, 4)})`}</span>
          </div>
          <div className=" text-[11px]">{show.overview && `${show.overview.slice(0, 80)}...`}</div>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-dividerGrey" />
    </div>
  )
}

export default SearchShowCard
