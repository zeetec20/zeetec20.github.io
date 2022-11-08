import { memo } from 'react';
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container className='text-center mb-4 footer' style={{ marginTop: '150px' }}>
      <p>© Firman Justisio Lestari (<a href="https://github.com/zeetec20/zeetec20.github.io" target="_blank" rel="noopener noreferrer">Contribute</a>)</p>
    </Container>
  )
}

export default memo(Footer);