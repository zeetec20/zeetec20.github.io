import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import fs from 'fs'
import matter from 'gray-matter';
import Head from 'next/head'
import styles from '../../styles/Portfolio.module.css'
import PortfolioComponent from '../../component/Portfolio'
import Link from 'next/link'
import dotenv from 'dotenv'
import { useSetRecoilState } from 'recoil';
import * as atom from '@/store/atom'

const PortfolioPage = ({ portfolio }: { portfolio: any[] }) => {
  const meta_name = 'Portfolio | Firman ✋'
  const setLoading = useSetRecoilState(atom.navbarLoading)

  let portfolioComponent: Array<Array<any>> = []
  portfolio.forEach((value, key) => {
    if (((key + 1) % 2) == 0) {
      portfolioComponent[portfolioComponent.length - 1].push(
        <div key={key} onClick={() => setLoading(true)}>
          <PortfolioComponent title={value['meta']['title']} description={value['meta']['description']} slug={value['slug']} tag={value['meta']['tag']} thumbnail={value['meta']['thumbnail']} />
        </div>
      )
    } else {
      portfolioComponent.push([
        <div key={key} onClick={() => setLoading(true)}>
          <PortfolioComponent title={value['meta']['title']} description={value['meta']['description']} slug={value['slug']} tag={value['meta']['tag']} thumbnail={value['meta']['thumbnail']} />
        </div>
      ])
    }
  })

  const ListPortfolioComponent = () => <div style={{ marginTop: '4%' }}>
    {portfolioComponent.map((com, key) => {
      return (
        <Row key={key}>
          {com.map((com, key) => <Col key={key} md={6} className="mb-5">{com}</Col>)}
        </Row>
      )
    })}
  </div>

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta itemProp="name" content={meta_name}/>

        <meta property="og:title" content={meta_name}/>

        <meta name="twitter:title" content={meta_name}/>
      </Head>

      <Container className={styles.wrap_list_portfolio} style={{ fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px' }}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>Portfolio.</p></b>
        <p className={styles.wrap_list_portfolio_description} style={{ width: '70%' }}>This page is for a showcase of my project not only that I will add personal project or just result from my learning. If you are interested in making a project like on my showcase you can <span onClick={() => setLoading(true)}><Link href='/about'><a>contact</a></Link></span> me we can realize together.</p>

        <ListPortfolioComponent/>
      </Container>
    </>
  )
}

export default PortfolioPage

export async function getStaticProps(context: any) {
  const env = dotenv.config()?.parsed

  const files = fs.readdirSync(env?.PRODUCTION ? './portfolio' : 'portfolio')
  let data: any[] = []

  await Promise.all(files.map(async (value) => {
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