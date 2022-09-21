import axios from 'axios'
import { handleError } from './notification'
import type { TmdbShow, MediaType, Movie, TV, Media } from '@/types/tmdb'
import { TMDB_API_URL } from './endpoints'

// tmdb image path prefix
export const tmdbImagePrefix780 = 'https://image.tmdb.org/t/p/w780'
export const tmdbImagePrefixWide = 'https://image.tmdb.org/t/p/w1280'
export const tmdbImagePrefixFull = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'
export const tmdbImagePrefixOriginal = 'https://image.tmdb.org/t/p/original'
export const tmdbImagePrefixPoster = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'

// create axios object for tmdb
const tmdbAPI = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
})

// tmdb api calls
const tmdb = {
  // query both movies and tv shows by search text
  search: async (query: string, page: number = 1): Promise<TmdbShow[]> => {
    try {
      const res = await tmdbAPI.get(`/search/multi`, {
        params: {
          query,
          page,
        },
      })!
      return res.data.results as TmdbShow[]
    } catch (err) {
      handleError(err as Error)
      return []
    }
  },

  // get movie or tv show details by id (fetched server-side)
  getDetails: async (id: number, type: MediaType): Promise<Detail> => {
    try {
      const res = await tmdbAPI.get(`/${type}/${id}`)
      const media: Media = { ...res.data, media_type: type }
      return { media, error: null }
    } catch (err) {
      console.error((err as Error).message)
      return { media: null, error: err as Error }
    }
  },
}

type Detail =
  | {
      media: Media
      error: null
    }
  | {
      media: null
      error: Error
    }

export default tmdb

// util functions for getting Media properties
export const getMediaTitle = (media: Media): string => {
  const title = media.media_type === 'movie' ? media.title || media.original_title : media.name
  return title || ''
}

export const getMediaReleaseDate = (media: Media): string | null => {
  const releaseDate = media.media_type === 'movie' ? media.release_date : media.first_air_date
  return releaseDate || null
}
