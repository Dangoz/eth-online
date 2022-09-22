import { MediaType } from './tmdb'

export type ParseReivewPostInput = {
  mediaName: string
  mediaYear: string
  mediaDescription: string
  reviewRating: number
  reviewHeadline: string
  reviewContent: string
  mediaType: MediaType
  mediaImage?: string
}
