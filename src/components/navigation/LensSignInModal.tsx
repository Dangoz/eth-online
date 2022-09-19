import { Modal, Button, Loading } from '@nextui-org/react'
import LensIcon from '../icons/LensIcon'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useCallback } from 'react'
import { generateChallenege, authenticate, LENS_AUTH } from '@/common/lens/authentication'
import useAddress from '@/hooks/useAddress'
import type { AuthenticationResult } from '@/types/generated/types'
import { useSignMessage } from 'wagmi'
import { handleError } from '@/common/notification'

interface LensSignInModalProps {
  open: boolean
  onClose: () => void
}

const LensSignInModal: React.FC<LensSignInModalProps> = ({ open, onClose }) => {
  const { address } = useAddress()
  const [isLoading, setIsLoading] = useState(false)
  const { data: signature, signMessage, error: signingError } = useSignMessage()

  const handleSignInLens = async () => {
    setIsLoading(true)

    const challenge = await generateChallenege(address)

    signMessage({ message: challenge })
  }

  const authenticateWithLens = useCallback(async (address: string, signature: string) => {
    if (!address || !signature) {
      return
    }
    const { accessToken, refreshToken }: AuthenticationResult = await authenticate(address, signature)
    localStorage.setItem(LENS_AUTH.ACCESS, accessToken)
    localStorage.setItem(LENS_AUTH.REFRESH, refreshToken)
    setIsLoading(false)
  }, [])

  // upon successful signature, authenticate with lens
  useEffect(() => {
    if (signingError) {
      handleError(new Error('Failed to sign message'))
      return setIsLoading(false)
    }

    if (signature) {
      authenticateWithLens(address, signature)
    }
  }, [signature, signingError, authenticateWithLens, address])

  return (
    <>
      <div>
        <Modal open={open} onClose={() => onClose()}>
          <Modal.Body>
            <div className="w-full flex justify-center p-5">
              <Button
                color={'success'}
                icon={<DocumentIcon />}
                size="sm"
                bordered
                className={'h-[40px] bg-transparent border'}
                disabled={isLoading}
                onPress={handleSignInLens}
              >
                {!isLoading && (
                  <div className="h-5 w-5 flex justify-center items-center fill-lensLime">
                    <LensIcon />
                  </div>
                )}
                {isLoading && <Loading color={'currentColor'} size="sm" textColor={'success'} />}
                <span className="ml-2">Sign in with Lens</span>
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default LensSignInModal
