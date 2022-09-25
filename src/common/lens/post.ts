import { gql } from 'urql'
import type { CreatePostBroadcastItemResult, CreatePublicPostRequest } from '@/types/generated/types'
import type { LensPost } from '@/types/lens'
import LensUrqlClient from './client'
import { handleError } from '../notification'

// Cineplanet Reviews are Publications/Posts in this context

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
        limit: 6
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

export const GET_POST_BY_PUBLICATIONID = gql`
  query Publication($publicationId: InternalPublicationId!) {
    publication(request: { publicationId: $publicationId }) {
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
  }
`

export const GET_POST_BY_TXHASH = gql`
  query Publication($txHash: TxHash!) {
    publication(request: { txHash: $txHash }) {
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
  }
`

export const GET_POST_BY_PROFILEID_AND_TAG = gql`
  query Publications($profileId: ProfileId!, $tag: [String!]) {
    publications(
      request: {
        profileId: $profileId
        publicationTypes: [POST]
        sources: ["cineplanet"]
        limit: 1
        metadata: { mainContentFocus: ARTICLE, tags: { oneOf: $tag } }
      }
    ) {
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

export const getPostByTxHash = async (txHash: string): Promise<LensPost | null> => {
  const variables = { txHash }
  const { data, error } = await LensUrqlClient.query(GET_POST_BY_TXHASH, variables, {
    requestPolicy: 'network-only',
  }).toPromise()
  if (error) {
    handleError(error)
    return null
  }

  return data.publication as LensPost
}

export const getPostByProfileIdAndTag = async (profileId: string, tag: string): Promise<LensPost | null> => {
  const variables = { profileId, tag: [tag] }
  const { data, error } = await LensUrqlClient.query(GET_POST_BY_PROFILEID_AND_TAG, variables, {
    requestPolicy: 'network-only',
  }).toPromise()
  if (error) {
    handleError(error)
    return null
  }

  return data.publications.items[0] as LensPost
}
