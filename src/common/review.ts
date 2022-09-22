import type {} from '@/types/nftport'
import type { LensPublicationMetadata } from '@/types/lens'
import type { ParseReivewPostInput } from '@/types/review'

// organize and format review post
export const parseReviewPost = (input: ParseReivewPostInput): string => {
  const mediaType = input.mediaType === 'movie' ? 'Movie 🎬' : 'TV 📺'
  const description =
    input.mediaDescription.length > 200 ? `${input.mediaDescription.substring(0, 200)}...` : input.mediaDescription
  const stars = '🟣'.repeat(input.reviewRating)
  const emptyStars = '⚪'.repeat(10 - input.reviewRating)
  const reviewHeadlineEmoji = '📌'
  const reviewContentEmoji = '📝'

  const post = `
${mediaType} Review - ${input.mediaName} (${input.mediaYear.slice(0, 4)}) 

${description}

Rating: ${stars}${emptyStars} (${input.reviewRating}/10)

${reviewHeadlineEmoji} ${input.reviewHeadline}

${reviewContentEmoji} ${input.reviewContent}
  `

  return post
}
