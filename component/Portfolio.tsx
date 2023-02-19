import { Card } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ImageShimmer from './ImageShimmer'
import Tag from './Tag'

interface propPortfolio {
  thumbnail: string,
  title: string,
  description: string,
  tag: string[],
  slug: string
}

const Portfolio = (prop: propPortfolio) => {
  let Tags = () => (
    <>
      {prop.tag.map((tag, key) => <Tag tag={tag} key={key} />)}
    </>
  )

  return (
    <Link href={`/portfolio/${prop.slug}`} style={{ textDecoration: 'none' }} passHref>
      <Card className='card-portfolio'>
        <div className='p-3 pb-0'>
          <div style={{ width: '100%', height: 'clamp(330px, 25vw, 400px)', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
            <ImageShimmer className='card-img-top' alt='' placeholder='blur' layout='fill' objectFit='cover' src={prop.thumbnail} />
          </div>
        </div>
        <Card.Body>
          <Card.Title className='text-dark' style={{ fontSize: '30px'}}><b>{prop.title}</b></Card.Title>

          <p style={{ color: process.env.color3, fontSize: '16px' }}>{prop.description}</p>

          <Tags />
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Portfolio