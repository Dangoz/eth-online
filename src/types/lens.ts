import type { ProfileMedia } from '@/types/generated/types'

export type LensSearchProfile = {
  id: string
  handle: string
  name?: string
  ownedBy: string
  picture?: ProfileMedia
}

export type LensProfile = {
  id: string
  handle: string
  name?: string
  bio?: string
  followNftAddress?: string
  picture?: ProfileMedia
  coverPicture?: ProfileMedia
  ownedBy: string
  stats: {
    totalFollowers: number
    totalFollowing: number
  }
}
