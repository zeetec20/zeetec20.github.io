import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot, useRecoilCallback } from 'recoil'
import Footer from '@/component/Footer'
import Navbar from '@/component/Navbar'
import { useEffect, useState } from 'react'
import { theme } from '@/store/theme'
import { setThemeMode } from '@/services/theme'

function Layout({ children }: any) {
  const themeCallback = useRecoilCallback( ({snapshot}) => async () => {
    setThemeMode(await snapshot.getPromise(theme))
  })
  const meta_url = process.env.domain
  const meta_name = 'Firman Lestari ✋'
  const meta_description = 'This is my personal website built with Next.js. I created this site to share information about technology and my learning. It also showcases my projects.'
  const meta_image = `${process.env.domain}/meta_image.png`

  useEffect(() => {
    themeCallback()
  }, [themeCallback])

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