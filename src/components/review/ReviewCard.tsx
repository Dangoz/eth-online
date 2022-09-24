import type { LensPost } from '@/types/lens'
import { reverseParseReviewPost } from '@/common/review'

interface ReviewcardProps {
  review: LensPost
}
const ReviewCard: React.FC<ReviewcardProps> = ({ review }) => {
  return (
    <>
      <div className="">{review.metadata.name}</div>
    </>
  )
}

export default ReviewCard
