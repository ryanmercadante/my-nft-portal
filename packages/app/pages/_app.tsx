import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { globalStyles } from '../styles/global'

declare global {
  interface Window {
    ethereum: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp
