import type {} from '@/types/nftport'
import type { LensPublicationMetadata } from '@/types/lens'
import type { ParseReivewPostInput } from '@/types/review'

// organize and format review post
export const parseReviewPost = (input: ParseReivewPostInput): string => {
  const mediaType = input.mediaType === 'movie' ? 'Movie 🎬' : 'TV 📺'
  // description with a max length of 200 characters
  const description =
    input.mediaDescription.length > 200 ? `${input.mediaDescription.substring(0, 200)}...` : input.mediaDescription

  const post = `
${mediaType} Review - ${input.mediaName} (${input.mediaYear.slice(0, 4)}) 

${description}

Rating: ${input.reviewRating}/10

${input.reviewHeadline}

${input.reviewContent}
  `

  return post
}
