import { NFTPORT_API_KEY } from './constants'
import { NFTPORT_API_URL } from '@/common/endpoints'
import axios, { AxiosError } from 'axios'
import { handleError } from './notification'
import type { IPFSMetadataInput, IPFSMetadataoutput } from '@/types/nftport'
import { NFTPORT_CINEPLANET_CONTRACT } from '@/common/constants'

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
      const response = await nftportAPI.post('/v0/metadata', input)
      return response.data as IPFSMetadataoutput
    } catch (err) {
      handleError(err as Error)
      return null
    }
  },

  // customizable mint of favorite nft
  mintFavorite: async (mintTo: string, metadataURL: string): Promise<string | null> => {
    try {
      const response = await nftportAPI.post('/v0/mints/customizable', {
        chain: 'polygon',
        contract_address: NFTPORT_CINEPLANET_CONTRACT,
        metadata_uri: metadataURL,
        mint_to_address: mintTo,
      })
      console.log('RESULT', response.data)
      if (response.data.response === 'OK') {
        return response.data.transaction_hash
      }
      return null
    } catch (err) {
      handleError(err as Error)
      return null
    }
  },

  // get favorite nft owned by address
  getFavorites: async (address: string): Promise<any[]> => {
    try {
      const response = await nftportAPI.get(
        `v0/accounts/${address}?chain=polygon&page_size=50&include=metadata&contract_address=${NFTPORT_CINEPLANET_CONTRACT}`,
      )
      if (response.data.response === 'OK') {
        return response.data.nfts
      }
      return []
    } catch (err) {
      handleError(err as Error)
      return []
    }
  },
}

export default nftport
