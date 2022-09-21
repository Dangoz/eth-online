import { gql } from 'urql'
import type { CreatePostBroadcastItemResult, CreatePublicPostRequest } from '@/types/generated/types'
import LensUrqlClient from './client'
import { handleError } from '../notification'

const CREATE_POST_TYPED_DATA = gql`
  mutation ($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`

export const createPostTypedData = async (
  profileId: string,
  contentURI: string,
): Promise<CreatePostBroadcastItemResult | null> => {
  const variables: { request: CreatePublicPostRequest } = {
    request: {
      profileId,
      contentURI,
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    },
  }

  const { data, error } = await LensUrqlClient.mutation(CREATE_POST_TYPED_DATA, variables).toPromise()
  if (error) {
    handleError(error)
    return null
  }
  return data.createPostTypedData as CreatePostBroadcastItemResult
}
