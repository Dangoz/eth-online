import axios from 'axios'
import { handleError } from './notification'
import type { TmdbShow } from '@/types/tmdb'

// tmdb image path prefix
export const tmdbImagePrefix300 = 'https://image.tmdb.org/t/p/w300'
export const tmdbImagePrefix500 = 'https://image.tmdb.org/t/p/w500'
export const tmdbImagePrefix780 = 'https://image.tmdb.org/t/p/w780'
export const tmdbImagePrefixWide = 'https://image.tmdb.org/t/p/w1280'

// create axios object for tmdb
const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
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

  // get movie or tv show details by id
  getDetails: async (id: number, type: 'movie' | 'tv') => {
    try {
      const res = await tmdbAPI.get(`/${type}/${id}`)
      return res.data
    } catch (err) {
      handleError(err as Error)
      return []
    }
  },
}

export default tmdb
