// chain env
export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true'

// lens
export const LENS_APP_ID = 'cineplanet'
const LENSHUB_POLYGON_PROXY_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'
const LENSHUB_MUMBAI_PROXY_ADDRESS = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82'
export const LENSHUB_PROXY_ADDRESS = IS_MAINNET ? LENSHUB_POLYGON_PROXY_ADDRESS : LENSHUB_MUMBAI_PROXY_ADDRESS

// nftport
export const NFTPORT_API_KEY = process.env.NEXT_PUBLIC_NFTPORT_API_KEY
export const NFTPORT_CINEPLANET_CONTRACT = '0x805dfdf48bf78b8ee6005ac2a0f7bd351ff3007d'

// tmdb
export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
export const TMDB_API_FALLBACK_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY_FALLBACK

// ipfs assets
export const LOGO_IPFS_URL = 'https://ipfs.io/ipfs/bafkreih3j4iudkhcj6ge3codfmxt7dy35szzevn7fkjxkr7ht5zcb6t364'

// worldid
export const WORLDID_ACTION_ID = process.env.NEXT_PUBLIC_WORLDID_ACTION_ID
