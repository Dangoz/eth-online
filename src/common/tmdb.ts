import axios from 'axios'
import { handleError } from './notification'
import type { TmdbShow, MediaType, Movie, TV, Media } from '@/types/tmdb'
import { TMDB_API_URL } from './endpoints'

// tmdb image path prefix
export const tmdbImagePrefix300 = 'https://image.tmdb.org/t/p/w300'
export const tmdbImagePrefix500 = 'https://image.tmdb.org/t/p/w500'
export const tmdbImagePrefix780 = 'https://image.tmdb.org/t/p/w780'
export const tmdbImagePrefixWide = 'https://image.tmdb.org/t/p/w1280'
export const tmdbImagePrefixFull = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'
export const tmdbImagePrefixOriginal = 'https://image.tmdb.org/t/p/original'

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
      const media = res.data as Media
      return { media, error: null }
    } catch (err) {
      console.error((err as Error).message)
      return { media: null, error: err as Error }
    }
  },
}

export default tmdb

type Detail =
  | {
      media: Media
      error: null
    }
  | {
      media: null
      error: Error
    }
