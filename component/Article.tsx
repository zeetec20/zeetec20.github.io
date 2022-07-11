/* eslint-disable @next/next/no-img-element */
import {Row, Col, Card } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface propArticle {
  profile: string,
  name: string,
  tag: string[],
  slug: string,

  image: string,
  title: string,
  description: string,
  date: string,
  days: string
}

class Article extends React.Component<propArticle> {
  static Tag(prop: { tag: string, className?: string }) {
    return (<a className={`tag me-2 ${prop.className}`} ><b>#{prop.tag}</b></a>)
  }

  render() {
    const prop = this.props

    let tags = prop.tag.map((tag, key) => <Article.Tag key={key} tag={tag} />)
    return (
      <Row className='article'>
        <Col md={12}>
          <Link href={`/article/${prop.slug}`} passHref={true}>
            <Card className='card-article'>
              <div className="row card-body">
                <Col md={4}>
                  <div className='bg-dark' style={{ position: 'relative', borderRadius: '10px', width: '100%', height: '100%' }}>
                    <Image className='img-thumbnail border-0' layout='fill' objectFit='cover' src={prop.image} alt="sans" />
                  </div>
                </Col>
                <Col md={8}>
                  <div className='mt-1'>
                    <Image className='rounded-circle' width='25px' height='25px' src={prop.profile} alt="" />
                    <p className='align-middle ms-1' style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold', color: process.env.color3 }}>{prop.name}</p>
                  </div>

                  <b><p className="card-title" style={{ fontSize: '30px' }}>{prop.title}</p></b>
                  <p style={{ color: process.env.color3, fontSize: '16px' }}>{prop.description}</p>

                  <p>{tags}</p>

                  <p className="card-text" style={{ fontSize: '14px' }}><b><span>{prop.date}</span></b> &nbsp; <span>({prop.days})</span></p>
                  {/* <a href=""><Button className='mt-3'>Read Article</Button></a> */}
                </Col>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    )
  }
}

export default Article