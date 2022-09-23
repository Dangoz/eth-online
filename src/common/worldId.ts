import { WORLDID_API_URL } from './endpoints'
import axios from 'axios'
import { handleError } from './notification'
import { VerifyInput, VerifyOutput } from '@/types/worldid'

// create axios object for worldid
const worldidAPI = axios.create({
  baseURL: WORLDID_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const verify = async (input: VerifyInput): Promise<VerifyOutput | null> => {
  try {
    const response = await worldidAPI.post('/verify', input)
    return response.data
  } catch (err) {
    console.log('ERROR', JSON.stringify(err, null, 2))
    handleError(err as Error)
    return null
  }
}
