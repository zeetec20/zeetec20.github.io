/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
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
// import Image from 'next/image'

const ArticleTagPage = ({ article }: {article: any[]}) => {
  const [loading, setloading] = useState(false)

  const router = useRouter()
  const tag = router.query['tag']!.toString().slice(0, 1).toUpperCase() + router.query['tag']!.toString().slice(1)

  const listArticle = article.map((value, key) => {
    const createdAt: string = moment(value['meta']['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')
    return (
      <div key={key} onClick={() => setloading(true)}>
         <ArticleComponent profile={value['meta']['writer-profile']} name={value['meta']['writer-name']} tag={value['meta']['tag']} slug={value['slug']} image={value['meta']['thumbnail']} title={value['meta']['title']} description={value['meta']['description']} date={createdAt} days={moment(value['meta']['createdAt'], 'DD-MM-YYYY').fromNow()} />
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>Article ({tag}) | Firman ✋</title>
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

export async function getServerSideProps(req: any, res: any) {
  const env = dotenv.config()?.parsed

  const files = fs.readdirSync(env?.PRODCUTION ? './articles' : 'articles')
  let data: any[] = []

  await Promise.all(files.filter(file => (matter(fs.readFileSync(env?.PRODUCTION ? `./articles/${file}` : `articles/${file}`)).data['tag'] as [string]).filter(tag => tag.toLowerCase() == req.query['tag'].toLowerCase()).length != 0).map(async (value) => {
    const file = fs.readFileSync(env?.PRODCUTION ? `./articles/${value}` : `articles/${value}`)
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