import { IPFS_GATEWAY } from './endpoints'
import type { LensPost } from '@/types/lens'

// check for ipfs and return source url
export const parseIpfs = (str: string): string => {
  if (str.startsWith('ipfs://')) {
    return `${IPFS_GATEWAY}/${str.replace('ipfs://', '')}`
  }
  return str
}

export const parseAddress = (address: string): string => {
  return address.slice(0, 4) + '...' + address.slice(-4)
}

export const getMediaId = (review: LensPost): string => {
  const tagIdentifier = review.metadata.tags[0]

  return tagIdentifier.includes('movie') ? tagIdentifier.split('movie')[1] : tagIdentifier.split('tv')[1]
}
