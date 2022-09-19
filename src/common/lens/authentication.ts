import { gql } from 'urql'
import LensUrqlClient from './client'
import { handleError } from '../notification'
import type {
  ChallengeRequest,
  SignedAuthChallenge,
  AuthenticationResult,
  RefreshRequest,
} from '@/types/generated/types'

// access token & refresh token enum
export enum LENS_AUTH {
  ACCESS = 'LENS_ACCESS_TOKEN',
  REFRESH = 'LENS_REFRESH_TOKEN',
}

const GET_CHALLENGE = gql`
  query ($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`

const AUTHENTICATION = gql`
  mutation ($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`

const REFRESH_AUTHENTICATION = gql`
  mutation ($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`

export const generateChallenege = async (address: string): Promise<string> => {
  const variables: { request: ChallengeRequest } = {
    request: {
      address,
    },
  }

  const { data, error } = await LensUrqlClient.query(GET_CHALLENGE, variables).toPromise()
  if (error) {
    handleError(error)
    return ''
  }

  return data.challenge.text as string
}

export const authenticate = async (address: string, signature: string): Promise<AuthenticationResult> => {
  const variables: { request: SignedAuthChallenge } = {
    request: {
      address,
      signature,
    },
  }

  const { data, error } = await LensUrqlClient.mutation(AUTHENTICATION, variables).toPromise()
  if (error) {
    handleError(error)
    return { accessToken: '', refreshToken: '' }
  }

  return data.authenticate as AuthenticationResult
}

export const refreshAuth = async (refreshToken: string): Promise<AuthenticationResult> => {
  const variables: { request: RefreshRequest } = {
    request: {
      refreshToken,
    },
  }

  const { data, error } = await LensUrqlClient.mutation(REFRESH_AUTHENTICATION, variables).toPromise()
  if (error) {
    handleError(error)
    return { accessToken: '', refreshToken: '' }
  }

  return data.refresh as AuthenticationResult
}
