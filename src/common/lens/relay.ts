import { gql } from 'urql'
import type { BroadcastRequest, RelayResult } from '@/types/generated/types'
import LensUrqlClient from './client'
import { notifyErrorMessage } from '../notification'

const BROADCAST_RELAY = gql`
  mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
    }
  }
`

export const broadcastRelay = async (id: string, signature: string): Promise<string | null> => {
  const variables: { request: BroadcastRequest } = {
    request: {
      id,
      signature,
    },
  }

  const { data, error } = await LensUrqlClient.mutation(BROADCAST_RELAY, variables).toPromise()
  if (error) {
    notifyErrorMessage((error as any).broadcast.reason)
    return null
  }

  return data.broadcast.txHash
}
