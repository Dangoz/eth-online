export type Attribute = {
  value: string
  trait_type: string
}

export type Collectible = {
  id: string
  value: string
  value_display: string
  contract_address: string
  standard: string
  name: string
  symbol: string
  image: string
  attributes: Attribute[]
  description: string
  animation_url: string
  external_link: string
}

export type Asset = {
  network: string
  token_address: string
  token_id: string
  token_standard: string
  owner: string
  title: string
  description: string
  attributes: Attribute[]
  image: string
  related_urls: string[]
  timestamp: string
}
