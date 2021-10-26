/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next'
import fs from 'fs'
import matter from 'gray-matter';
import moment from 'moment';
import styles from '../../styles/Article.module.css'
import Head from 'next/head'
import NavbarComponent from '../../component/Navbar'
import FooterComponent from '../../component/Footer'
import ArticleComponent from '../../component/Article'
import Link from 'next/link'
// import Image from 'next/image'

const ArticlePage = ({ article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setloading] = useState(false)

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
        <title>Article | Firman ✋</title>
      </Head>

      <NavbarComponent loading={loading} />
      
      <Container className={styles.wrap_list_article} style={{fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px'}}>
        <b><p style={{fontSize: '35px', fontWeight: 'bold'}}>Article.</p></b>
        <p className={styles.wrap_list_article_description} style={{width: '70%'}}>Sometimes when i&apos;m bored I like writing and this article is very usefull for my noted because I often forget what I learned, maybe my article is not good like medium or dev.to but it&apos;s still worth for your read.</p>

        <div style={{marginTop: '4%'}}>
          {listArticle}
        </div>
      </Container>

      <FooterComponent/>
    </>
  )
}

export default ArticlePage

export async function getServerSideProps() {
  const files = fs.readdirSync('articles')
  let data: any[] = []

  await Promise.all(files.map(async (value) => {
    const file = fs.readFileSync(`articles/${value}`)
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