import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { tmdbImagePrefixFull, tmdbImagePrefixOriginal } from '@/common/tmdb'
import type { Media } from '@/types/tmdb'
import { Image } from '@nextui-org/react'
import ShowReviews from './ShowReviews'

const ShowContainer: React.FC<{ media: Media }> = ({ media }) => {
  return (
    <>
      <div>
        <img
          src={tmdbImagePrefixFull + (media.backdrop_path || media.poster_path)}
          alt="Cover Image"
          className="w-full h-[60vh] object-cover"
        />

        <ShowReviews />
      </div>
    </>
  )
}

export default ShowContainer
