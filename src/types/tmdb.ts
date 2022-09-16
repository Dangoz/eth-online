export type MediaType = 'movie' | 'tv'

export type TmdbShow = {
  title?: string
  original_title?: string
  name?: string
  original_name?: string
  backdrop_path?: string
  release_date?: string
  poster_path?: string
  id?: number
  genre_ids?: number[]
  original_language?: string
  overview?: string
  media_type: MediaType
}
