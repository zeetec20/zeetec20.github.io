import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot, useRecoilCallback } from 'recoil'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navbar'
import * as atom from '@/store/atom'
import { useEffect, useState } from 'react'
import ThemeService from '@/services/themeService'

function Layout({ children }: any) {
  const themeService = new ThemeService()
  const [test, settest] = useState(0)
  const themeCallback = useRecoilCallback( ({snapshot}) => async () => {
    const theme = await snapshot.getPromise(atom.theme)
    themeService.useThemeMode(theme)
  })
  const meta_url = process.env.domain
  const meta_name = 'Firman Lestari ✋'
  const meta_description = 'Is it my personal website build with next js, I make this site for sharing about technology and my learning, there are also showcase my project.'
  const meta_image = `${process.env.domain}/meta_image.png`

  useEffect(() => {
    themeCallback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      settest(test + 1)
    }, 500)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>

        <meta name="description" content={meta_description} />

        <meta itemProp="name" content={meta_name} />
        <meta itemProp="description" content={meta_description} />
        <meta itemProp="image" content={meta_image} />

        <meta property="og:url" content={meta_url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta_name} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:image" content={meta_image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta_name} />
        <meta name="twitter:description" content={meta_description} />
        <meta name="twitter:image" content={meta_image}></meta>

        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>

      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp