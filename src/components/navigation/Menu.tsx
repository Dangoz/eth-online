import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import useAddress from '@/hooks/useAccount'

const Menu = () => {
  const { address, isConnected } = useAddress()

  return (
    <>
      <div className=" m-auto h-[64px] w-[500px] bg-slate-500 sticky top-2 rounded-full flex items-center justify-center z-50">
        <ConnectButton />
      </div>
    </>
  )
}

export default Menu
