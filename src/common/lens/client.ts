import { createClient } from 'urql'
import { LENS_API_URL, LENS_TESTNET_API_URL } from '../endpoints'
import { LENS_AUTH } from './authentication'
import { IS_MAINNET } from '@/common/constants'

const LensUrqlClient = createClient({
  url: IS_MAINNET ? LENS_API_URL : LENS_TESTNET_API_URL,

  fetchOptions: () => {
    const accessLocal = typeof window !== 'undefined' ? localStorage.getItem(LENS_AUTH.ACCESS) : ''
    // check access token (local) for valid jwt format
    const token = accessLocal && accessLocal.split('.').length === 3 ? accessLocal : ''
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

export default LensUrqlClient
