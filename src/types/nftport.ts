export type IPFSMetadataInput = {
  name: string
  description: string
  file_url: string
  external_url?: string
  animation_url?: string
  custom_fields?: any
  attributes?: MetadataAttribute[]
}

export type IPFSMetadataoutput = {
  response: ResponseStatus
  metadata_uri: string
  name?: string
  description?: string
  file_url?: string
  external_url?: string
  animation_url?: string
  custom_fields?: any
  attributes?: MetadataAttribute[]
}

export type MetadataAttribute = {
  trait_type: string
  value: string
  max_value?: number
  display_type?: string
}

export type ResponseStatus = 'OK' | 'NOK'
