import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { GET_POST_BY_PUBLICATIONID } from '@/common/lens/post'
import type { LensPost } from '@/types/lens'
import { handleError } from '@/common/notification'
import ReviewPost from './ReviewPost'
import ReviewPostLoader from './ReviewPostLoader'

const ReviewContainer: React.FC = () => {
  const router = useRouter()
  const [review, setReview] = useState<LensPost | null>(null)
  const [reviewResult] = useQuery({
    query: GET_POST_BY_PUBLICATIONID,
    variables: {
      publicationId: router.query.id,
    },
  })

  useEffect(() => {
    if (reviewResult.error) {
      return handleError(reviewResult.error)
    }
    if (reviewResult.fetching) {
      return
    }
    if (reviewResult.data) {
      setReview(reviewResult.data.publication)
    }
  }, [reviewResult])

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-[70px]"> </div>

        {review && <ReviewPost review={review} />}
        {!review && <ReviewPostLoader />}
      </div>
    </>
  )
}

export default ReviewContainer
