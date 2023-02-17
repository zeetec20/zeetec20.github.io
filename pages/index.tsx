/* eslint-disable @next/next/no-img-element */
import { Container, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import styles from '@/styles/Home.module.css'
import ArticleComponent from '@/component/Article'
import Link from 'next/link'
import getArticles from '@/services/getArticles';
import { dateDDMMYYYToTimeSince } from '@/utils';
import { useSetRecoilState } from 'recoil';
import * as atom from '@/store/atom'

interface HomePageProps {
  articles: { [key: string]: any }[]
}

const HomePage = ({ articles }: HomePageProps) => {
  const setLoading = useSetRecoilState(atom.navbarLoading)

  const ListArticle = () => {
    return (
      <div className='mt-4'>
        {articles.map((value, key) => {
          const createdAt: string = moment(value['meta']['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')
          return (
            <div key={key} onClick={() => setLoading(true)}>
              <ArticleComponent profile={value['meta']['writer-profile']} name={value['meta']['writer-name']} tag={value['meta']['tag']} slug={value['slug']} image={value['meta']['thumbnail']} title={value['meta']['title']} description={value['meta']['description']} date={createdAt} days={dateDDMMYYYToTimeSince(value['meta']['createdAt'])} />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <Container className={styles.wrap} style={{ marginTop: '5.5%' }}>
        <b><p style={{ fontFamily: 'Source Sans Pro', fontSize: '40px' }}>I&apos; am Firman Justisio Lestari</p></b>
        <p style={{ fontFamily: 'ubuntu', fontSize: '20px', width: '70%' }}>You can call me firman, I&apos; am Software Engineer were focused on 🖥️ web app with technology (Django, Laravel, Next) and 📱 mobile app with technology (Flutter) </p>

        <Link href='/about' passHref>
          <Button onClick={() => setLoading(true)} className='mt-4 py-2 button-about' variant='outline-dark'>More About Me</Button>
        </Link>
      </Container>

      <Container className={styles.wrap} style={{ marginTop: '8%', fontFamily: 'Source Sans Pro' }}>
        <h4>Recent Article 📖</h4>

        <ListArticle />
      </Container>
    </>
  )
}

export default HomePage

export const getStaticProps = async (context: any) => {
  return {
    props: { articles: (await getArticles()).slice(0, 3) }
  }
}