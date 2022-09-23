import { Modal } from '@nextui-org/react'
import { WorldIDWidget } from '@worldcoin/id'
import type { VerificationResponse } from '@worldcoin/id'
import type { VerifyInput } from '@/types/worldid'
import { handleError } from '@/common/notification'
import { WORLDID_ACTION_ID } from '@/common/constants'
import { verify } from '@/common/worldId'

interface WorldIDModalProps {
  open: boolean
  onClose: () => void
}

const WorldIDModal: React.FC<WorldIDModalProps> = ({ open, onClose }) => {
  const handleVerify = async (verificationResponse: VerificationResponse) => {
    const verifyInput: VerifyInput = {
      merkle_root: verificationResponse.merkle_root,
      nullifier_hash: verificationResponse.nullifier_hash,
      proof: verificationResponse.proof,
      action_id: WORLDID_ACTION_ID || '',
      signal: 'cineplanet-review',
    }
    console.log('verifyInput', verifyInput)
    const result = await verify(verifyInput)
    console.log('result', result)
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Modal.Body>
          WORLD ID~~~
          <WorldIDWidget
            actionId={WORLDID_ACTION_ID || ''} // obtain this from developer.worldcoin.org
            signal="cineplanet-review"
            enableTelemetry
            onSuccess={(verificationResponse) => handleVerify(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
            onError={(error) => handleError(error)}
            debug={true}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default WorldIDModal
