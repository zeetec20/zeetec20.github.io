/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PortfolioComponent from '../../../component/Portfolio'
import dotenv from 'dotenv'
import { useSetRecoilState } from 'recoil'
import { navbarLoading } from '@/store/navbarLoading'
// import Image from 'next/image'

const PortfolioTagPage = ({ portfolio }: { portfolio: any[] }) => {
  const setLoading = useSetRecoilState(navbarLoading)

  const router = useRouter()
  const tag = router.query['tag']!.toString().slice(0, 1).toUpperCase() + router.query['tag']!.toString().slice(1)
  const meta_name = `Article (${tag}) | Firman ✋`

  const listArticle = portfolio.map((value, key) => {
    return (
      <div key={key} className="col-md-6 mb-5" onClick={() => setLoading(true)}>
        <PortfolioComponent tag={value['meta']['tag']} slug={value['slug']} thumbnail={value['meta']['thumbnail']} title={value['meta']['title']} description={value['meta']['description']} />
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta itemProp="name" content={meta_name} />

        <meta property="og:title" content={meta_name} />

        <meta name="twitter:title" content={meta_name} />
      </Head>

      <Container style={{ fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px' }}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>{tag}.</p></b>
        <p style={{ width: '70%' }}>Articles with tag <b className='ms-1'>{tag}</b></p>

        <Row style={{ marginTop: '4%' }}>
          {listArticle}
        </Row>
      </Container>
    </>
  )
}

export default PortfolioTagPage

export async function getStaticPaths() {
  const env = dotenv.config()?.parsed
  const files = fs.readdirSync(env?.PRODUCTION ? './portfolio' : 'portfolio')

  let tags: string[] = []

  files.forEach(file => {
    const text = fs.readFileSync(env?.PRODUCTION ? `./portfolio/${file}` : `portfolio/${file}`)
    const meta: { [key: string]: any; } = matter(text).data;

    (meta['tag'] as string[]).forEach((element: string) => {
      if (tags.filter(e => e == element).length == 0) tags.push(element)
    });
  })

  return {
    paths: tags.map(tag => { return { params: { tag: tag.toLowerCase() } } }),
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const env = dotenv.config()?.parsed

  const files = fs.readdirSync(env?.PRODUCTION ? './portfolio' : 'portfolio')
  let data: any[] = []
  const { tag } = context.params

  await Promise.all(files.filter(file => (matter(fs.readFileSync(env?.PRODUCTION ? `./portfolio/${file}` : `portfolio/${file}`)).data['tag'] as [string]).filter(tag_file => tag.toLowerCase() == tag_file.toLowerCase()).length != 0).map(async (value) => {
    const file = fs.readFileSync(env?.PRODUCTION ? `./portfolio/${value}` : `portfolio/${value}`)
    const meta: any = matter(file).data

    data.push({
      'meta': meta,
      'slug': value.split('.')[0],
      'content': matter(file).content
    })
  }))

  return {
    props: { portfolio: data }
  }
}