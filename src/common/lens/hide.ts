import { gql } from 'urql'
import LensUrqlClient from './client'

export const HIDE_PUBLICATION = gql`
  mutation HidePublication($publicationId: InternalPublicationId!) {
    hidePublication(request: { publicationId: $publicationId })
  }
`

export const hidePublication = async (publicationId: string): Promise<boolean> => {
  const variables: { publicationId: string } = {
    publicationId,
  }

  const { data, error } = await LensUrqlClient.mutation(HIDE_PUBLICATION, variables).toPromise()
  if (error) {
    return false
  }

  return true
}
