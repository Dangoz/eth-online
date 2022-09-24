import type {
  ProfileMedia,
  PublicationMetadataV2Input,
  BroadcastRequest,
  MetadataOutput,
  MediaSet,
  PublicationMainFocus,
} from '@/types/generated/types'

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

export type LensPublicationMetadata = PublicationMetadataV2Input

export type LensPost = {
  id: string
  appId: string
  createdAt: Date
  profile: {
    id: string
    name?: string
    handle: string
    picture?: ProfileMedia
  }
  metadata: {
    name: string
    description: string
    content: string
    image: string
    media: MediaSet[]
    tags: string[]
    mainContentFocus: PublicationMainFocus
  }
  stats: {
    totalAmountOfComments: number
    totalAmountOfCollects: number
    totalUpvotes: number
  }
}
