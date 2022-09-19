import { useContext } from 'react'
import { userContext } from '@/store/userContext'
import type { UserContext as UserContextType } from '@/types/user'

const useUser = (): UserContextType => {
  const context = useContext(userContext)
  if (context === undefined) {
    throw new Error('useUser must be used within userContextProvider')
  }
  return context
}

export default useUser
