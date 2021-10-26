/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next'
import fs from 'fs'
import matter from 'gray-matter';
import Head from 'next/head'
import styles from '../../styles/Portfolio.module.css'
import NavbarComponent from '../../component/Navbar'
import FooterComponent from '../../component/Footer'
import PortfolioComponent from '../../component/Portfolio'
import Link from 'next/link'
// import Image from 'next/image'

const PortfolioPage = ({ portfolio }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setloading] = useState(false)

  let portfolioComponent: Array<Array<any>> = []
  portfolio.forEach((value, key) => {
    if (((key + 1) % 2) == 0) {
      portfolioComponent[portfolioComponent.length - 1].push(
        <div key={key} onClick={() => setloading(true)}>
          <PortfolioComponent title={value['meta']['title']} description={value['meta']['description']} slug={value['slug']} tag={value['meta']['tag']} />
        </div>
      )
    } else {
      portfolioComponent.push([
        <div key={key} onClick={() => setloading(true)}>
          <PortfolioComponent title={value['meta']['title']} description={value['meta']['description']} slug={value['slug']} tag={value['meta']['tag']} />
        </div>
      ])
    }
  })
  const listPortfolioComponent = portfolioComponent.map((com, key) => {
    return (
      <Row key={key}>
        {com.map((com, key) => <Col key={key} md={6}>{com}</Col>)}
      </Row>
    )
  })

  return (
    <>
      <Head>
        <title>Portfolio | Firman ✋</title>
      </Head>

      <NavbarComponent loading={loading} />

      <Container className={styles.wrap_list_portfolio} style={{ fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px' }}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>Portfolio.</p></b>
        <p className={styles.wrap_list_portfolio_description} style={{ width: '70%' }}>This page is for a showcase of my project not only that I will add personal project or just result from my learning. If you are interested in making a project like on my showcase you can <span onClick={() => setloading(true)}><Link href='/about'><a>contact</a></Link></span> me we can realize together.</p>

        <div style={{ marginTop: '4%' }}>
          {listPortfolioComponent}
        </div>
      </Container>

      <FooterComponent/>
    </>
  )
}

export default PortfolioPage

export async function getServerSideProps() {
  const files = fs.readdirSync('portfolio')
  let data: any[] = []

  await Promise.all(files.map(async (value) => {
    const file = fs.readFileSync(`portfolio/${value}`)
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