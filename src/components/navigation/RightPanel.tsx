import { Button } from '@nextui-org/react'
import { useConnectModal, useAccountModal, useChainModal, ConnectButton } from '@rainbow-me/rainbowkit'
import useAddress from '@/hooks/useAddress'
import { useEnsName, useEnsAvatar, chain } from 'wagmi'

const RightPanel: React.FC = () => {
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  const { address, isConnected } = useAddress()
  const {
    data: ensName,
    isError: isEnsNameError,
    isLoading: isEnsNameLoading,
  } = useEnsName({
    address,
    chainId: chain.mainnet.id,
  })
  const {
    data: ensAvatar,
    isError: isEnsAvatarError,
    isLoading: isEnsAvatarLoading,
  } = useEnsAvatar({
    addressOrName: address,
    chainId: chain.mainnet.id,
  })

  return (
    <>
      <div className="flex justify-end items-center gap-5">
        {!isConnected ? (
          <Button
            color={'gradient'}
            shadow={true}
            size="xs"
            onClick={openConnectModal}
            className={`bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree h-[44px] w-[99px] text-[16px] text-[black] z-10`}
          >
            Connect
          </Button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </>
  )
}

export default RightPanel
