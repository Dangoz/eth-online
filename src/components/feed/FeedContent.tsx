import React from 'react'
import type { LensPost } from '@/types/lens'

interface FeedContentProps {
  reviews: LensPost[]
}

const FeedContent: React.FC<FeedContentProps> = ({ reviews }) => {
  return (
    <>
      <div>Feed Content</div>
      {/* {JSON.stringify(reviews[0], null, 2)} */}

      <div className="flex flex-col">
        {reviews.map((review, index) => (
          <div key={index}>{review.metadata.name}</div>
        ))}
      </div>
    </>
  )
}

export default FeedContent
