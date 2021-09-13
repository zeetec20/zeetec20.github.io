import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'


interface propType {
  loading?: boolean
}

const NavbarComponent = (prop: propType) => {
  const router = useRouter()
  const [loading, setloading] = useState(prop.loading)

  console.log(router.asPath)

  return (
    <>
      <div className="wrap-loading position-absolute w-100" style={{left: 0, right: 0, overflow: 'hidden'}}>
        <div className={`loading ${(prop.loading || loading) ? 'loading-visible' : 'loading-hidden'}`}></div>
      </div>
      <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}>
        <Container>
          <div className='mt-5' onClick={() => (router.asPath != '/') ? setloading(true) : null}>
            <Link href="/" passHref>
              <Navbar.Brand><b><p style={{ fontFamily: 'ubuntu' }}>Firman</p></b></Navbar.Brand>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />


          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <div onClick={() => (router.asPath != '/portfolio') ? setloading(true) : null}>
                <Link href='/portfolio' passHref>
                  <Nav.Link className='px-3' style={{ color: 'black', fontFamily: 'ubuntu' }}>⚙️ Portfolio</Nav.Link>
                </Link>
              </div>
              <div onClick={() => (router.asPath != '/article') ? setloading(true) : null}>
                <Link href='/article' passHref>
                  <Nav.Link className='px-3' style={{ color: 'black', fontFamily: 'ubuntu' }}>📖 Article</Nav.Link>
                </Link>
              </div>
              <div onClick={() => (router.asPath != '/about') ? setloading(true) : null}>
                <Link href='/about' passHref>
                  <Nav.Link className='px-3' style={{ color: 'black', fontFamily: 'ubuntu' }}>👨‍💻 About</Nav.Link>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent