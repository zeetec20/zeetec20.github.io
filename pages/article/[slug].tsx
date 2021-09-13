/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import NavbarComponent from '../../component/Navbar'
import FooterComponent from '../../component/Footer'
import ArticleComponent from '../../component/Article'
import NextError from 'next/error'
import styles from '../../styles/Article.module.css'
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import Link from 'next/link'

const Markdown = (props: { markdown: string }) => {
  return <ReactMarkdown components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <ReactSyntaxHighlighter
          style={xonokai}
          language={match[1]}
          PreTag="div"
        >{children}</ReactSyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }}
  >{props.markdown}</ReactMarkdown>
}

const DetailArticlePage = ({ status, meta, article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (status == 404) return <NextError statusCode={status} />

  let tags = (meta['tag'] as string[]).map((tag, key) => <Link href={`/article/tag/${tag.toLowerCase()}`} key={key} passHref><span style={{cursor: 'pointer'}}><ArticleComponent.Tag tag={tag} className={styles.tag} /></span></Link>)

  return (
    <>
      <Head>
        <title>{meta['title']} | Firman ✋</title>
      </Head>

      <NavbarComponent />

      <Container className={`text-center ${styles.article_width}`} style={{ fontFamily: 'Source Sans Pro'}}>
        <Container className={`position-relative ${styles.thumbnail}`}>
          <Image src={meta['thumbnail']} className='img-thumbnail border-0' layout='fill' objectFit='cover' alt='thumnail article' />
        </Container>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>{meta['title']}</p></b>

        <p className={`mt-4 ${styles.description}`} style={{ textAlign: 'center' }}>-- &nbsp; {moment(meta['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')} &nbsp; | &nbsp; {moment(meta['createdAt'], 'DD-MM-YYYY').fromNow()} &nbsp; --</p>

        {tags}
      </Container>

      <Container className={`${styles.article_width}`} style={{ fontFamily: 'Source Sans Pro', marginTop: '6%' }}>
        <div className='mt-1'>
          <Image className='rounded-circle' width='49px' height='49px' src={meta['writer-profile']} alt="" />
          <p className='align-middle ms-2' style={{ display: 'inline-block', fontSize: '25px', fontWeight: 'bold', color: process.env.color3, marginBottom: '35px' }}>{meta['writer-name']}</p>
        </div>
      </Container>
      
      <Container className={`${styles.article_width}`} style={{ fontFamily: 'Source Sans Pro', marginTop: '10px' }}>
        <Markdown markdown={article!} />
      </Container>

      <FooterComponent />
    </>
  )
}

export default DetailArticlePage

export async function getServerSideProps(context: any) {

  const { slug } = context.query
  if (!fs.existsSync(`articles/${slug}.md`)) return {
    props: {
      status: 404,
      meta: null,
      article: null,
    }
  }

  const file = fs.readFileSync(`articles/${slug}.md`)
  const meta: any = matter(file).data
  const resultGithub: Response = await fetch(`https://github.com/${meta['writer']}`, {
    headers: { 'Content-Type': 'text/html' },
  });
  const text = await resultGithub.text()
  const profile = text.split('https://avatars.githubusercontent.com/u/')[1].split('?')[0]
  const name = text.split('itemprop="name">')[1].split('<')[0]

  meta['writer-profile'] = 'https://avatars.githubusercontent.com/u/' + profile
  meta['writer-name'] = name

  return {
    props: { meta, article: matter(file).content }
  }
}