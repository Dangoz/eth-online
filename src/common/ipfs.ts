// check for ipfs and return source url
export const parseIpfs = (str: string): string => {
  if (str.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${str.replace('ipfs://', '')}`
  }
  return str
}
