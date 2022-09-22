import { NFTPORT_API_KEY } from './constants'
import { NFTPORT_API_URL } from '@/common/endpoints'
import axios from 'axios'
import { handleError } from './notification'

// create axios object for nftport
const nftportAPI = axios.create({
  baseURL: NFTPORT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${NFTPORT_API_KEY}`,
  },
})

// nftport api calls
const nftport = {}

export default nftport
