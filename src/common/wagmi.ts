import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.mainnet],
  [
    // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
    // jsonRpcProvider({
    // 	rpc: chain => ({
    // 		http: ``,
    // 	})
    // }),
  ],
)

export const { connectors } = getDefaultWallets({
  appName: 'CinePlanet',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
