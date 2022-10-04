import { RSS3_API_URL } from '@/common/endpoints'
import axios from 'axios'
import type { Asset } from '@/types/rss3'
import { handleError } from './notification'

// create axios object for rss3
const rss3API = axios.create({
  baseURL: RSS3_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// rss3 api calls
const rss3 = {
  // get assets by address or eth/lens handle
  getAssets: async (addressOrHandle: string, cursor: string, limit: number = 10): Promise<AssetsResponse | null> => {
    try {
      const response = await rss3API.get(`/assets/${addressOrHandle}?cursor=${cursor}&limit=${limit}`)
      return {
        assets: response.data.result as Asset[],
        cursor: response.data.cursor,
        total: response.data.total,
      }
    } catch (err) {
      handleError(err as Error)
      return null
    }
  },
}

export default rss3

type AssetsResponse = {
  assets: Asset[]
  cursor: string
  total: number
}
