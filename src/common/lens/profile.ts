import { gql } from 'urql'
import LensUrqlClient from './client'
import type { LensProfile } from '@/types/lens'

export const ProfileMediaFields = gql`
  fragment ProfileMediaFields on ProfileMedia {
    ... on NftImage {
      uri
    }
    ... on MediaSet {
      original {
        url
      }
    }
  }
`

export const SEARCH_PROFILE_QUERY = gql`
  query SearchProfile($query: Search! = "", $limit: LimitScalar = 5) {
    search(request: { query: $query, type: PROFILE, limit: $limit }) {
      ... on ProfileSearchResult {
        __typename
        items {
          ... on Profile {
            id
            handle
            name
            ownedBy
            picture {
              ...ProfileMediaFields
            }
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
  ${ProfileMediaFields}
`

export const GET_PROFILE_QUERY = gql`
  query Profile($profileId: ProfileId!) {
    profile(request: { profileId: $profileId }) {
      id
      name
      bio
      followNftAddress
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      stats {
        totalFollowers
        totalFollowing
      }
    }
  }
`

const GET_PROFILE_QUERY_BY_ADDRESS = gql`
  query ProfilesByAddress($ownedBy: EthereumAddress!) {
    profiles(request: { ownedBy: [$ownedBy], limit: 1 }) {
      items {
        id
        name
        bio
        followNftAddress
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        stats {
          totalFollowers
          totalFollowing
        }
      }
    }
  }
`

export const getLensProfileByAddress = async (address: string): Promise<LensProfile | null> => {
  const { data, error } = await LensUrqlClient.query(GET_PROFILE_QUERY_BY_ADDRESS, { ownedBy: address }).toPromise()
  if (error) {
    console.error(error.message)
    return null
  }
  return data.profiles.items[0]
}
