import { createContext, useState } from 'react'
import type { User, UserContext } from '@/types/user'

const userInitialStates: UserContext = {
  userStore: {
    WorldIdVerified: false,
    LensAuthenticated: false,
  },
  setUserStore: (stateChange: Partial<User>) => {},
}

export const userContext = createContext<UserContext>(userInitialStates)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userStore, setUserStore] = useState<User>(userInitialStates.userStore)

  return (
    <userContext.Provider
      value={{
        userStore,
        setUserStore: (data) => {
          setUserStore({ ...userStore, ...data })
        },
      }}
    >
      {children}
    </userContext.Provider>
  )
}
