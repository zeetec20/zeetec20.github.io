/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import moment from 'moment'
import Head from 'next/head'
import {useRouter} from 'next/router'
import NavbarComponent from '../../../component/Navbar'
import FooterComponent from '../../../component/Footer'
import ArticleComponent from '../../../component/Article'
import Link from 'next/link'
import dotenv from 'dotenv'
import { dateDDMMYYYToTimeSince } from '@/utils'
// import Image from 'next/image'

const ArticleTagPage = ({ article }: {article: any[]}) => {
  const [loading, setloading] = useState(false)

  const router = useRouter()
  const tag = router.query['tag']!.toString().slice(0, 1).toUpperCase() + router.query['tag']!.toString().slice(1)
  const meta_name = `Article (${tag}) | Firman ✋`

  const listArticle = article.map((value, key) => {
    const createdAt: string = moment(value['meta']['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')
    return (
      <div key={key} onClick={() => setloading(true)}>
         <ArticleComponent profile={value['meta']['writer-profile']} name={value['meta']['writer-name']} tag={value['meta']['tag']} slug={value['slug']} image={value['meta']['thumbnail']} title={value['meta']['title']} description={value['meta']['description']} date={createdAt} days={dateDDMMYYYToTimeSince(value['meta']['createdAt'])} />
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta itemProp="name" content={meta_name}/>

        <meta property="og:title" content={meta_name}/>

        <meta name="twitter:title" content={meta_name}/>
      </Head>

      <NavbarComponent loading={loading} />
      
      <Container style={{fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px'}}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>{tag}.</p></b>
        <p style={{ width: '70%' }}>Articles with tag <b className='ms-1'>{tag}</b></p>

        <div style={{marginTop: '4%'}}>
          {listArticle}
        </div>
      </Container>

      <FooterComponent/>
    </>
  )
}

export default ArticleTagPage

export async function getStaticPaths() {
  const env = dotenv.config()?.parsed
  const files = fs.readdirSync(env?.PRODUCTION ? './articles' : 'articles')

  let tags: string[] = []

  files.forEach(file => {
    const text = fs.readFileSync(env?.PRODUCTION ? `./articles/${file}` : `articles/${file}`)
    const meta: { [key: string]: any; } = matter(text).data;
      
    (meta['tag'] as string[]).forEach((element: string) => {
      if (tags.filter(e => e == element).length == 0) tags.push(element)
    });
  })

  return {
    paths: tags.map(tag => { return {params: {tag: tag.toLowerCase()}}}),
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const env = dotenv.config()?.parsed

  const files = fs.readdirSync(env?.PRODUCTION ? './articles' : 'articles')
  let data: any[] = []
  const { tag } = context.params

  await Promise.all(files.filter(file => (matter(fs.readFileSync(env?.PRODUCTION ? `./articles/${file}` : `articles/${file}`)).data['tag'] as [string]).filter(tag_file => tag.toLowerCase() == tag_file.toLowerCase()).length != 0).map(async (value) => {
    const file = fs.readFileSync(env?.PRODUCTION ? `./articles/${value}` : `articles/${value}`)
    const meta: any = matter(file).data
    
    const resultGithub: Response = await fetch(`https://github.com/${meta['writer']}`, {
      headers: { 'Content-Type': 'text/html' },
    });
    const text = await resultGithub.text()
    const profile = text.split('https://avatars.githubusercontent.com/u/')[1].split('?')[0]
    const name = text.split('itemprop="name">')[1].split('<')[0]

    meta['writer-profile'] = 'https://avatars.githubusercontent.com/u/' + profile
    meta['writer-name'] = name
    
    data.push({
      'meta': meta,
      'slug': value.split('.')[0],
      'content': matter(file).content
    })
  }))

  return {
    props: { article: data }
  }
}