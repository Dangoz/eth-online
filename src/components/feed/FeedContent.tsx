import { useEffect } from 'react'
import type { LensPost } from '@/types/lens'
import ReviewCard from '@/components/review/ReviewCard'

interface FeedContentProps {
  reviews: LensPost[]
}

const FeedContent: React.FC<FeedContentProps> = ({ reviews }) => {
  return (
    <>
      <div className="gap-5 p-2 columns-[400px]">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </>
  )
}

export default FeedContent
