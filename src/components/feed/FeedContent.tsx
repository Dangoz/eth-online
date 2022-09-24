import React from 'react'
import type { LensPost } from '@/types/lens'
// import StackGrid from 'react-stack-grid'
import ReviewCard from '@/components/review/ReviewCard'

interface FeedContentProps {
  reviews: LensPost[]
}

const FeedContent: React.FC<FeedContentProps> = ({ reviews }) => {
  return (
    <>
      {/* {JSON.stringify(reviews[0], null, 2)} */}

      <div className="flex flex-col">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </>
  )
}

export default FeedContent
