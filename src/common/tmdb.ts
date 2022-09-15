import axios from 'axios'

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
  // get videos based on text search query
  getVideosByQuery: async (query: string) => {
    const { data } = await tmdbAPI.get('/search/movie', {
      params: {
        query,
      },
    })
    return data
  },
}

export default tmdb
