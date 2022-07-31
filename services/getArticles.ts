import dotenv from 'dotenv'
import fs from 'fs'
import matter from 'gray-matter';
import moment from 'moment';

const getArticles = async () => {
  const env = dotenv.config()?.parsed

  const files = fs.readdirSync(env?.PRODUCTION ? './articles' : 'articles')
  let data: {}[] = []

  await Promise.all(files.map(async (value) => {
    const file = fs.readFileSync(env?.PRODUCTION ? `./articles/${value}` : `articles/${value}`)
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
  data = data.sort((a: any, b: any) => moment(a['meta']['createdAt'], 'DD-MM-YYYY').unix() - moment(b['meta']['createdAt'], 'DD-MM-YYYY').unix()).reverse()

  return data
}

export default getArticles