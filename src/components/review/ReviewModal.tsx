import { Modal, Button, Loading } from '@nextui-org/react'
import type { Media } from '@/types/tmdb'
import { handleError } from '@/common/notification'
import { tmdbImagePrefixPoster, getMediaTitle, getMediaReleaseDate } from '@/common/tmdb'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, media }) => {
  const handleReviewSubmit = async () => {}

  return (
    <>
      <Modal open={open} onClose={onClose} closeButton blur>
        <Modal.Body>
          <div className="flex flex-col w-full h-full">
            <div className="">
              <img
                alt="poster"
                src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
                className="w-[80px] h-[120px] object-cover"
              />
              <div className="">
                <div>
                  {getMediaTitle(media)}
                  <span>{`(${getMediaReleaseDate(media)?.slice(0, 4)})`}</span>
                </div>
                <div>{media.overview}</div>
              </div>
            </div>

            <Button onPress={handleReviewSubmit}>click</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewModal
