import { Modal } from '@nextui-org/react'
interface LensSignInModalProps {
  open: boolean
  onClose: () => void
}
const LensSignInModal: React.FC<LensSignInModalProps> = ({ open, onClose }) => {
  return (
    <>
      <div>
        <Modal open={open} onClose={() => onClose()}>
          {/* <Modal.Body>
          
        </Modal.Body> */}
          123
        </Modal>
      </div>
    </>
  )
}

export default LensSignInModal
