export type User = {
  LensAuthenticated: boolean
  WorldIdVerified: boolean
}

export type UserContext = {
  userStore: User
  setUserStore: (user: Partial<User>) => void
}
