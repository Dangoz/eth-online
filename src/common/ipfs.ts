import { IPFS_GATEWAY } from './endpoints'

// check for ipfs and return source url
export const parseIpfs = (str: string): string => {
  if (str.startsWith('ipfs://')) {
    return `${IPFS_GATEWAY}/${str.replace('ipfs://', '')}`
  }
  return str
}
