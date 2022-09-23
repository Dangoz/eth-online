import { gql } from 'urql'

export const IS_FOLLOWED_BY_ME = gql`
  query Profile($profileId: ProfileId!) {
    profile(request: { profileId: $profileId }) {
      isFollowedByMe
    }
  }
`
