import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import tmdb from '@/common/tmdb'
import type { Media } from '@/types/tmdb'

const ShowContainer: React.FC<{ media: Media }> = ({ media }) => {
  return (
    <>
      <div>{JSON.stringify(media, null, 2)}</div>
    </>
  )
}

export default ShowContainer
