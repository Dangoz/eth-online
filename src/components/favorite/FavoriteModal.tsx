import { Modal } from '@nextui-org/react'
import { useState } from 'react'
import type { Media } from '@/types/tmdb'

interface FavoriteModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({ open, onClose, media }) => {
  const [isMinting, setIsMinting] = useState(false)

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeButton
        blur
        width="500px"
        className="bg-bgBlue"
        preventClose={isMinting}
      >
        <Modal.Body>{JSON.stringify(media, null, 2)}</Modal.Body>
      </Modal>
    </>
  )
}

export default FavoriteModal
