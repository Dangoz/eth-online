import { gql } from 'urql'

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
  query Profile($profileId: ProfileId! = "0x01") {
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
