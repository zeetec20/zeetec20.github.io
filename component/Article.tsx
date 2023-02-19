/* eslint-disable @next/next/no-img-element */
import { Row, Col, Card } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageShimmer from './ImageShimmer'
import Tag from './Tag'

interface ArticleProps {
  profile: string,
  name: string,
  tags: string[],
  slug: string,
  image: string,
  title: string,
  description: string,
  date: string,
  days: string
}

const Article = ({
  slug,
  image,
  profile,
  title,
  description,
  date,
  days,
  tags,
  name,
}: ArticleProps) => (
  <Row className='article'>
    <Col md={12}>
      <Link href={`/article/${slug}`} passHref={true} style={{ color: 'unset', textDecoration: 'unset' }} legacyBehavior>
        <Card className='card-article'>
          <div className="row card-body">
            <Col md={4}>
              <div className='bg-dark' style={{ position: 'relative', borderRadius: '5px', width: '100%', height: '100%', overflow: 'hidden'}}>
                <ImageShimmer quality={25} className='border-0' fill={true} placeholder='blur' style={{ objectFit: 'cover' }} src={image} alt="" />
              </div>
            </Col>
            <Col md={8}>
              <div className='mt-1' style={{ display: 'flex' }}>
                <ImageShimmer className='rounded-circle' style={{ width: '25px', height: '25px' }} src={profile} alt="" />
                <p className='align-middle' style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold', color: process.env.color3, marginTop: '2px', marginLeft: '32px' }}>{name}</p>
              </div>

              <b><p className="card-title" style={{ fontSize: '30px' }}>{title}</p></b>
              <p style={{ color: process.env.color3, fontSize: '16px' }}>{description}</p>

              <p><ListTags tags={tags} /></p>

              <p className="card-text" style={{ fontSize: '14px' }}><b><span>{date}</span></b> &nbsp; <span>({days})</span></p>
            </Col>
          </div>
        </Card>
      </Link>
    </Col>
  </Row>
)

const ListTags = ({ tags }: { tags: string[] }) => (
  <>
    {tags.map(
      (tag, key) => <Tag key={key} tag={tag} />
    )}
  </>
)

export default Article