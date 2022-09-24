import { gql } from 'urql'
import type { CreatePostBroadcastItemResult, CreatePublicPostRequest } from '@/types/generated/types'
import type { LensPost } from '@/types/lens'
import LensUrqlClient from './client'
import { handleError } from '../notification'

// Cineplanet Reviews are Posts in this context

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

export const EXPLORE_LATEST_POSTS = gql`
  query ExplorePublications($cursor: Cursor = null) {
    explorePublications(
      request: {
        sortCriteria: LATEST
        publicationTypes: [POST]
        sources: ["cineplanet"]
        limit: 10
        noRandomize: false
        cursor: $cursor
      }
    ) {
      pageInfo {
        prev
        next
        totalCount
      }
      items {
        __typename
        ... on Post {
          id
          appId
          createdAt
          profile {
            id
            name
            handle
            picture {
              ... on MediaSet {
                original {
                  url
                }
              }
            }
          }
          metadata {
            name
            description
            content
            image
            media {
              original {
                url
              }
            }
            tags
            mainContentFocus
          }
          stats {
            totalAmountOfComments
            totalAmountOfCollects
            totalUpvotes
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
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

export const exploreLatestPosts = async (cursor?: string): Promise<LensPost[]> => {
  const variables = { ...(cursor && { cursor }) }
  const { data, error } = await LensUrqlClient.query(EXPLORE_LATEST_POSTS, variables).toPromise()
  if (error) {
    handleError(error)
    return []
  }
  return data.explorePublications.items as LensPost[]
}
