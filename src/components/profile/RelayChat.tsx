import { useEffect } from 'react'
import { useSigner } from 'wagmi'
import { useSetWallet, Window, Launcher, Intercom } from '@relaycc/receiver'

const RelayChat: React.FC = () => {
  const { data: wallet } = useSigner()
  const setWallet = useSetWallet()

  useEffect(() => {
    setWallet(wallet || null)
  }, [wallet, setWallet])

  return (
    <>
      <Intercom>
        <Window />
      </Intercom>
    </>
  )
}

export default RelayChat
