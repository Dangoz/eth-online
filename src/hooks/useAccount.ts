import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

interface Address {
  address: string
  isConnected: boolean
}

// wrapper for getting address & isConnected on client
const useAddress = (): Address => {
  const { address: wagmiAddress, isConnected: wagmiIsConnected } = useAccount()
  const [address, setAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setAddress(wagmiAddress || '')
  }, [wagmiAddress])

  useEffect(() => {
    setIsConnected(wagmiIsConnected)
  }, [wagmiIsConnected])

  return { address, isConnected }
}

export default useAddress
