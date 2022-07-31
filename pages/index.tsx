/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import fs from 'fs'
import matter from 'gray-matter';
import moment from 'moment';
import styles from '@/styles/Home.module.css'
import NavbarComponent from '@/component/Navbar'
import FooterComponent from '@/component/Footer'
import ArticleComponent from '@/component/Article'
import Link from 'next/link'
import getArticles from '@/services/getArticles';

const HomePage = ({ article }: { article: any[] }) => {
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
      <NavbarComponent loading={loading} />

      <Container className={styles.wrap} style={{ marginTop: '5.5%'}}>
        <b><p style={{ fontFamily: 'Source Sans Pro', fontSize: '40px' }}>I&apos; am Firman Justisio Lestari</p></b>
        <p style={{ fontFamily: 'ubuntu', fontSize: '20px', width: '70%' }}>You can call me firman, I&apos; am Software Engineer were focused on 🖥️ web app with technology (Django, Laravel, Next) and 📱 mobile app with technology (Flutter) </p>

        <Link href='/about' passHref>
          <Button onClick={() => setloading(true)} className='mt-4 py-2 button-about' variant='outline-dark'>More About Me</Button>
        </Link>
      </Container>

      <Container className={styles.wrap} style={{ marginTop: '8%', fontFamily: 'Source Sans Pro' }}>
        <h4>Recent Article 📖</h4>

        <div className='mt-4'>
          {listArticle}
        </div>
      </Container>

      <FooterComponent />
    </>
  )
}

export default HomePage

export const getStaticProps = async (context: any) => {
  return {
    props: { article: await getArticles() }
  }
}