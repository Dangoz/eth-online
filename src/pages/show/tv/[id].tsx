import type { NextPage, GetServerSideProps } from 'next'
import ShowContainer from '@/components/show/ShowContainer'
import type { Media } from '@/types/tmdb'
import tmdb from '@/common/tmdb'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

const TV: NextPage = () => {
  const router = useRouter()
  const [media, setMedia] = useState<Media | null>(null)

  const getTV = useCallback(async () => {
    const id = router?.query?.id as string
    const { media, error } = await tmdb.getDetails(+id, 'tv')
    if (error !== null) {
      return {
        notFound: true,
      }
    }
    setMedia(media)
  }, [router])

  useEffect(() => {
    getTV()
  }, [getTV])

  return <>{media && <ShowContainer media={media} />}</>
}

export default TV
