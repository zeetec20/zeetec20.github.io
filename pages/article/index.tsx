import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import styles from '../../styles/Article.module.css'
import Head from 'next/head'
import ArticleComponent from '../../component/Article'
import { dateDDMMYYYToTimeSince } from '@/utils';
import { useSetRecoilState } from 'recoil';
import { navbarLoading } from '@/store/navbarLoading';
import { getArticles } from '@/services/article';

interface ArticlePageProps {
  articles: { [key: string]: any }[],
}

const ArticlePage = ({ articles }: ArticlePageProps) => {
  const meta_name = 'Article | Firman ✋'
  const setLoading = useSetRecoilState(navbarLoading)

  const listArticle = articles.map((value, key) => {
    const createdAt: string = moment(value['meta']['createdAt'], 'DD-MM-YYYY').format('dddd, MMMM DD YYYY')
    return (
      <div key={key} onClick={() => setLoading(true)}>
        <ArticleComponent profile={value['meta']['writer-profile']} name={value['meta']['writer-name']} tags={value['meta']['tag']} slug={value['slug']} image={value['meta']['thumbnail']} title={value['meta']['title']} description={value['meta']['description']} date={createdAt} days={dateDDMMYYYToTimeSince(value['meta']['createdAt'])} />
      </div>
    )
  })

  console.log('test 123 article')

  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta itemProp="name" content={meta_name} />

        <meta property="og:title" content={meta_name} />

        <meta name="twitter:title" content={meta_name} />
      </Head>

      <Container className={styles.wrap_list_article} style={{ fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px' }}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>Article.</p></b>
        <p className={styles.wrap_list_article_description} style={{ width: '70%' }}>Sometimes when i&apos;m bored I like writing and this article is very usefull for my noted because I often forget what I learned, maybe my article is not good like medium or dev.to but it&apos;s still worth for your read.</p>

        <div style={{ marginTop: '4%' }}>
          {listArticle}
        </div>
      </Container>
    </>
  )
}

export default ArticlePage

export async function getStaticProps(context: any) {
  return {
    props: { articles: await getArticles() }
  }
}