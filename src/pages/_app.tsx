import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/common/wagmi'
import Navbar from '@/components/navigation/Navbar'
import { Provider as UrqlProvider } from 'urql'
import { UserContextProvider } from '@/store/userContext'
import LensUrqlClient from '@/common/lens/client'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: 'dark',
  })
  return (
    <UserContextProvider>
      <UrqlProvider value={LensUrqlClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <NextUIProvider theme={theme}>
              <Navbar />
              <Component {...pageProps} />
              <ToastContainer />
            </NextUIProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </UrqlProvider>
    </UserContextProvider>
  )
}

export default MyApp
