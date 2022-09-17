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
            metadata
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
