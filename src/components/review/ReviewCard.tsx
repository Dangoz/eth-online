import type { LensPost } from '@/types/lens'
import { reverseParseReviewPost } from '@/common/review'
import type { ParseReivewPostInput } from '@/types/review'
import Divider from '@/components/ui/Divider'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { parseIpfs } from '@/common/utils'
import BackArrow from '@/components/icons/BackArrow'
import StarRating from '@/components/ui/StarRating'

interface ReviewcardProps {
  review: LensPost
}
const ReviewCard: React.FC<ReviewcardProps> = ({ review }) => {
  const [originalReview, setOriginalReview] = useState<ParseReivewPostInput | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const parsedReview = reverseParseReviewPost(review.metadata.content)
    setOriginalReview(parsedReview)
  }, [review])

  useEffect(() => {
    const avatar = review.profile.picture?.__typename === 'MediaSet' && review.profile.picture.original.url
    if (avatar) {
      setAvatar(parseIpfs(avatar))
    }
  }, [review])

  return (
    <>
      <div
        className="w-full rounded-[24px] bg-bgGrey flex flex-col justify-start border-[2px] border-white 
         p-[24px] gap-2 mt-5 transition duration-150 ease-in-out"
        style={{
          breakInside: 'avoid',
        }}
      >
        {/* creator */}
        <div className="flex justify-start items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full gradientBG flex justify-center items-center">
            <img
              alt="avatar"
              className="w-[48px] h-[48px] rounded-full bg-bgBlue object-cover"
              src={avatar ? avatar : '/logo.svg'}
            />
          </div>

          <div>
            <div>{`${review.profile.name || review.profile.handle}`}</div>
            <div>{`@${review.profile.handle}`}</div>
          </div>
        </div>

        {/* media info */}
        <div className="flex justify-start items-center gap-3 pl-3">
          <BackArrow />
          <img alt="poster" className="w-[60px] h-[90px] object-cover" src={review.metadata.image} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 font-semibold">
              <div>{originalReview?.mediaName}</div>
              {/* <div className='text-[10px] text-slate-300'>{`(${originalReview?.mediaYear.slice(0, 4)})`}</div> */}
            </div>

            <StarRating viewOnly={true} totalRating={10} rating={originalReview?.reviewRating || 10} />
          </div>
        </div>

        {/* review */}
        <div className="flex flex-col gap-2">
          <div className="text-[18px] font-semibold">{originalReview?.reviewHeadline}</div>
          <div className=" break-words">{originalReview?.reviewContent}</div>
        </div>

        <Divider />

        <div className="flex gap-16 text-[12px]">
          <div>{review.stats.totalAmountOfComments} Comments</div>
          <div>{review.stats.totalAmountOfCollects} Collects</div>
        </div>

        <Divider />

        <div className="text-[12px] text-slate-300">{dayjs(review.createdAt).format('h:mm A MMM D, YYYY')}</div>
      </div>
    </>
  )
}

export default ReviewCard
