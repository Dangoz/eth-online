import type { ProfileMedia } from '@/types/generated/types'

export type LensSearchProfile = {
  id: string
  handle: string
  name?: string
  ownedBy: string
  picture?: ProfileMedia
}
