/* eslint-disable @next/next/no-img-element */
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import ArticleComponent from '../../component/Article'
import NextError from 'next/error'
import styles from '../../styles/Portfolio.module.css'
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Link from 'next/link'
import dotenv from 'dotenv'
import rehypeRaw from 'rehype-raw'
import ImageShimmer from '@/component/ImageShimmer';

const Markdown = (props: { markdown: string }) => {
  return <ReactMarkdown components={{// eslint-disable-next-line react/display-name
    img: ({node, ...props}) => (
      <div className='radius img-thumbnail' style={{border: 'calc(1px + 0.25rem) solid #dee2e6', padding: '0'}}>
        <ImageShimmer quality={90} src={props.src ?? ''} style={{position: 'relative'}} layout="fill" objectFit="contain" alt='' />
      </div>
    ),
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
  }} rehypePlugins={[rehypeRaw]}
  >{props.markdown}</ReactMarkdown>
}

const DetailPortfolioPage = ({ status, meta, article }: {status: any, meta: any, article: any}) => {
  const meta_name = `${meta['title']} | Firman ✋`
  const meta_description = meta['description']
  const meta_image = `${process.env.domain}${meta['thumbnail']}`
  if (status == 404) return <NextError statusCode={status} />

  let tags = (meta['tag'] as string[]).map((tag, key) => <Link href={`/portfolio/tag/${tag.toLowerCase()}`} key={key} passHref><span style={{cursor: 'pointer'}}><ArticleComponent.Tag tag={tag} className={styles.tag} /></span></Link>)

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta name="description" content={meta_description}/>

        <meta itemProp="name" content={meta_name}/>
        <meta itemProp="description" content={meta_description}/>
        <meta itemProp="image" content={meta_image}/>

        <meta property="og:title" content={meta_name}/>
        <meta property="og:description" content={meta_description}/>
        <meta property="og:image" content={meta_image}/>

        <meta name="twitter:title" content={meta_name}/>
        <meta name="twitter:description" content={meta_description}/>
        <meta name="twitter:image" content={meta_image}></meta>
      </Head>

      <Container className={`text-center ${styles.article_width} ${styles.wrap_thumbnail}`} style={{ fontFamily: 'Source Sans Pro'}}>
        <Container className={`position-relative ${styles.thumbnail}`}>
          <ImageShimmer quality={75} placeholder='blur' src={meta['thumbnail']} className='img-thumbnail border-0' layout='fill' objectFit='cover' alt='thumnail article' />
        </Container>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>{meta['title']}</p></b>

        <p className={`mt-4 ${styles.description}`} style={{ textAlign: 'center' }}>-- &nbsp; {moment(meta['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')} &nbsp; | &nbsp; {moment(meta['createdAt'], 'DD-MM-YYYY').fromNow()} &nbsp; --</p>
      </Container>

      <Container className={`${styles.article_width} ${styles.wrap_title} p-0 pb-1 pe-1 pe-5 ps-5`} style={{ fontFamily: 'Source Sans Pro', marginTop: '6%' }}>
        <div className={`border p-0 pb-1 pe-1 border-top-0 border-start-0`} style={{ fontFamily: 'Source Sans Pro', marginTop: '6%'}}>
          <div className="border p-3 pb-1" style={{overflow: 'auto'}}>
            <p>App : &nbsp; <b><a href={meta['app']} target="_blank" rel="noopener noreferrer">{meta['app']}</a></b> </p>
            <p>Tag : &nbsp; {tags}</p>
          </div>
        </div>
      </Container>

      <Container className={`${styles.article_width} ${styles.wrap_content}`} style={{ fontFamily: 'Source Sans Pro', marginTop: '40px' }}>
        <Markdown markdown={article!} />
      </Container>
    </>
  )
}

export default DetailPortfolioPage

export async function getStaticPaths() {
  const env = dotenv.config()?.parsed
  const files = fs.readdirSync(env?.PRODUCTION ? './portfolio' : 'portfolio')

  let portfolio: string[] = []

  files.forEach(file => {
    portfolio.push(file.split('.')[0])
  })

  return {
    paths: portfolio.map(portfolio => { return {params: {slug: portfolio.toLowerCase()}}}),
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const env = dotenv.config()?.parsed

  const { slug } = context.params
  const file = fs.readFileSync(env?.PRODUCTION ? `./portfolio/${slug}.md` : `portfolio/${slug}.md`)
  const meta: any = matter(file).data

  return {
    props: { meta, article: matter(file).content }
  }
}