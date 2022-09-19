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

export type Movie = {
  backdrop_path?: string
  poster_path?: string
  release_date?: string
  runtime?: number | null
  status?: status
  genres?: genre[]
  id?: number
  title?: string
  original_title?: string
  overview?: string
  tagline?: string
  media_type: 'movie'
}

export type TV = {
  backdrop_path?: string
  poster_path?: string
  name?: string
  generes?: genre[]
  episode_run_time?: number[]
  first_air_date?: string
  last_air_date?: string
  id?: number
  in_production?: boolean
  last_episode_to_air?: episode
  next_episode_to_air?: episode
  number_of_episodes?: number
  number_of_seasons?: number
  overview?: string
  status?: status
  tagline?: string
  media_type: 'tv'
}

export type Media = Movie | TV

export type genre = {
  id: number
  name: string
}

export type status = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'

export type episode = {
  air_date?: string
  episode_number?: number
  id?: number
  name?: string
  overview?: string
  production_code?: string
  season_number?: number
  still_path?: string
}
