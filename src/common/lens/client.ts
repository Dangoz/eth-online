import { createClient } from 'urql'
import { LENS_API_URL, LENS_TESTNET_API_URL } from '../endpoints'

const LensUrqlClient = createClient({
  url: LENS_API_URL,
})

export default LensUrqlClient
