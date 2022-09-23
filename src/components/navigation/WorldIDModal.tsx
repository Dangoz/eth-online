import { Modal } from '@nextui-org/react'
import { WorldIDWidget } from '@worldcoin/id'

interface WorldIDModalProps {
  open: boolean
  onClose: () => void
}

const WorldIDModal: React.FC<WorldIDModalProps> = ({ open, onClose }) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Modal.Body>
          WORLD ID~~~
          <WorldIDWidget
            actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
            signal="my_signal"
            enableTelemetry
            onSuccess={(verificationResponse) => console.log(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
            onError={(error) => console.error(error)}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default WorldIDModal
