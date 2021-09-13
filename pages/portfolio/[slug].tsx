/* eslint-disable @next/next/no-img-element */
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
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

const DetailPortfolioPage = ({ status, meta, article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      </Container>

      <Container className={`${styles.article_width} p-0 pb-1 pe-1 pe-5 ps-5`} style={{ fontFamily: 'Source Sans Pro', marginTop: '6%' }}>
        <div className={`border p-0 pb-1 pe-1 border-top-0 border-start-0`} style={{ fontFamily: 'Source Sans Pro', marginTop: '6%' }}>
          <div className="border p-3 pb-1">
            <p>App : &nbsp; <b><a href={meta['app']} target="_blank" rel="noopener noreferrer">{meta['app']}</a></b> </p>
            <p>Tag : &nbsp; {tags}</p>
          </div>
        </div>
      </Container>

      <Container className={`${styles.article_width}`} style={{ fontFamily: 'Source Sans Pro', marginTop: '40px' }}>
        <Markdown markdown={article!} />
      </Container>

      <FooterComponent />
    </>
  )
}

export default DetailPortfolioPage

export async function getServerSideProps(context: any) {

  const { slug } = context.query
  if (!fs.existsSync(`portfolio/${slug}.md`)) return {
    props: {
      status: 404,
      meta: null,
      article: null,
    }
  }

  const file = fs.readFileSync(`portfolio/${slug}.md`)
  const meta: any = matter(file).data

  return {
    props: { meta, article: matter(file).content }
  }
}