import { NFTPORT_API_KEY } from './constants'
import { NFTPORT_API_URL } from '@/common/endpoints'
import axios from 'axios'
import { handleError } from './notification'
import type { IPFSMetadataInput, IPFSMetadataoutput } from '@/types/nftport'

// create axios object for nftport
const nftportAPI = axios.create({
  baseURL: NFTPORT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${NFTPORT_API_KEY}`,
  },
})

// nftport api calls
const nftport = {
  // upload metadata to ipfs
  uploadMetadata: async (input: IPFSMetadataInput): Promise<IPFSMetadataoutput | null> => {
    try {
      const response = await nftportAPI.post('/ipfs/metadata', input)
      return response.data as IPFSMetadataoutput
    } catch (err) {
      handleError(err as Error)
      return null
    }
  },
}

export default nftport
