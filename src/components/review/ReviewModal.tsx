import { Modal, Button, Loading, Spacer, Textarea, Input } from '@nextui-org/react'
import type { Media } from '@/types/tmdb'
import { handleError } from '@/common/notification'
import { tmdbImagePrefixPoster, getMediaTitle, getMediaReleaseDate } from '@/common/tmdb'
import { useState } from 'react'
import StarRating from '@/components/ui/StarRating'
import Divider from '@/components/ui/Divider'
import { parseReviewPost } from '@/common/review'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, media }) => {
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewContent, setReviewContent] = useState('')

  const handleReviewSubmit = async () => {
    const reviewPost = parseReviewPost({
      mediaName: getMediaTitle(media),
      mediaYear: getMediaReleaseDate(media) || '',
      mediaDescription: media.overview || '',
      mediaImage: tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path),
      reviewRating: rating,
      reviewHeadline: reviewTitle,
      reviewContent,
      mediaType: media.media_type,
    })

    console.log(reviewPost)
  }

  return (
    <>
      <Modal open={open} onClose={onClose} closeButton blur width="500px" className="bg-bgBlue">
        <Modal.Body>
          <div className="flex flex-col w-full h-full gap-3">
            {/* media info card */}
            <div className="flex justify-start gap-3 mb-2">
              <img
                alt="poster"
                src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
                className="w-[80px] h-[120px] object-cover"
              />
              <div className="h-[120px] overflow-y-scroll">
                <div className="flex gap-2 font-bold">
                  {getMediaTitle(media)}
                  <span className="text-slate-500">{`(${getMediaReleaseDate(media)?.slice(0, 4)})`}</span>
                </div>
                <Spacer y={0.25} />
                <div className="text-[12px]">{media.overview}</div>
              </div>
            </div>

            {/* review form */}
            <div className="font-semibold">YOUR RATING</div>
            <div>
              <div className="flex justify-start items-center gap-3">
                <StarRating rating={rating} totalRating={10} onChange={(rating) => setRating(rating)} />
                <div className="text-titlePurple font-bold text-[20px]">{rating}</div>
              </div>
              <Divider />
            </div>

            {/* <Divider /> */}

            <div className="font-semibold">YOUR REVIEW</div>

            <Input
              aria-label="Write a headline for your review here..."
              bordered
              placeholder="Write a headline for your review here..."
              color="secondary"
              value={`${reviewTitle}`}
              onChange={(e) => setReviewTitle(e.target.value)}
            />

            <Textarea
              aria-label="Write your review here..."
              bordered
              color="secondary"
              placeholder="Write your review here..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />

            {/* button options */}
            <div className="flex justify-end">
              <Button onPress={handleReviewSubmit} className="w-[50%] h-[44px] text-[16px] text-white bg-titlePurple">
                Submit Review
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewModal
