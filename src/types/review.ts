import { MediaType } from './tmdb'

export type ParseReivewPostInput = {
  mediaName: string
  mediaYear: string
  mediaDescription: string
  mediaImage: string
  reviewRating: number
  reviewHeadline: string
  reviewContent: string
  mediaType: MediaType
}
