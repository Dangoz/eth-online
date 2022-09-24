import type { ParseReivewPostInput } from '@/types/review'

// organize and format review post
export const parseReviewPost = (input: ParseReivewPostInput): string => {
  const mediaType = input.mediaType === 'movie' ? '🎬 Movie' : '📺 TV'
  const description =
    input.mediaDescription.length > 200 ? `${input.mediaDescription.substring(0, 200)}...` : input.mediaDescription
  const stars = '🟣'.repeat(input.reviewRating)
  const emptyStars = '⚪'.repeat(10 - input.reviewRating)
  const reviewHeadlineEmoji = '📌'
  const reviewContentEmoji = '📝'
  const hashTags = input.hashTags.map((tag) => `#${tag}`).join(' ')

  const post = `
${mediaType} Review - ${input.mediaName} (${input.mediaYear.slice(0, 4)}) 

${description}

Rating: ${stars}${emptyStars} (${input.reviewRating}/10)

${reviewHeadlineEmoji} ${input.reviewHeadline}

${reviewContentEmoji} ${input.reviewContent}

${hashTags}
  `

  return post
}

// uno reverse ~
export const reverseParseReviewPost = (reviewPost: string): ParseReivewPostInput => {
  const lines = reviewPost.split('\n')
  const mediaType = lines[0].includes('Movie') ? 'movie' : 'tv'
  const mediaName = lines[1].split('-')[1].split('(')[0].trim()
  const mediaYear = lines[1].split('(')[1].split(')')[0].trim()
  const mediaDescription = lines[3]
  const reviewRating = lines[5].split(' ')[1].split('🟣').length - 1
  const reviewHeadline = lines[7].split('📌')[1].trim()
  const reviewContent = lines.slice(9, lines.length - 1).join('\n')
  const hashTags = lines[lines.length - 1].split(' ').filter((tag) => tag.startsWith('#'))

  return {
    mediaName,
    mediaYear,
    mediaDescription,
    mediaImage: '',
    reviewRating,
    reviewHeadline,
    reviewContent,
    mediaType,
    hashTags,
  }
}
