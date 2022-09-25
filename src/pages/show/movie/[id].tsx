import type { NextPage, GetServerSideProps } from 'next'
import ShowContainer from '@/components/show/ShowContainer'
import type { Media } from '@/types/tmdb'
import tmdb from '@/common/tmdb'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

const Movie: NextPage = () => {
  const router = useRouter()
  const [media, setMedia] = useState<Media | null>(null)

  const getMovie = useCallback(async () => {
    const id = router?.query?.id as string
    const { media, error } = await tmdb.getDetails(+id, 'movie')
    if (error !== null) {
      return {
        notFound: true,
      }
    }
    setMedia(media)
  }, [router])

  useEffect(() => {
    getMovie()
  }, [getMovie])

  return <>{media && <ShowContainer media={media} />}</>
}

export default Movie
