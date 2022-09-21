import { Modal, Button, Loading } from '@nextui-org/react'
import type { Media } from '@/types/tmdb'
import { handleError } from '@/common/notification'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, media }) => {
  const handleReviewSubmit = async () => {
    handleError(new Error('Failed to submit review'))
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeButton
        blur
        // set z-index to 1000 to make sure it's on top of the navbar
        // css={{ zIndex: 1000 }}
        css={{
          zIndex: 0,
        }}
      >
        <Modal.Body>
          <div className="flex flex-col w-full h-full">
            {media.media_type === 'movie' ? media.title : media.name}
            <Button onPress={handleReviewSubmit}>click</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewModal
