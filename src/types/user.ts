import type { LensProfile } from './lens'

export type User = {
  lensAuthenticated: boolean
  worldIdVerified: boolean
  lensProfile: LensProfile | null
}

export type UserContext = {
  userStore: User
  setUserStore: (user: Partial<User>) => void
}
