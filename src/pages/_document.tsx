import { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react'
import theme from '@/common/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head>{CssBaseline.flush()}</Head>
      <body
        className={`bg-[${theme.backgroundColor}] min-h-screen min-w-[1100px] text-white text-[14px] overflow-x-auto`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
