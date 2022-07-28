import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import {switchThemeMode} from '@/store/themeAction'
import * as atom from '@/store/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import Image from 'next/image'
import nightIcon from '@/public/night.png'
import dayIcon from '@/public/day.png'
import { ThemeMode } from '@/types'
import {useSpring, config, animated} from '@react-spring/web'

interface propType {
  loading?: boolean
}

const NavbarComponent = (prop: propType) => {
  const [theme, setTheme] = useRecoilState(atom.theme)
  const router = useRouter()
  const [loading, setloading] = useState(prop.loading)

  return (
    <>
      <div className="wrap-loading position-absolute w-100" style={{ left: 0, right: 0, overflow: 'hidden' }}>
        <div className={`loading ${(prop.loading || loading) ? 'loading-visible' : 'loading-hidden'}`}></div>
      </div>
      <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}>
        <Container>
          <div className='mt-5' onClick={() => (router.asPath != '/') ? setloading(true) : null}>
            <Link href="/" passHref>
              <Navbar.Brand className='theme-brand'><b><p style={{ fontFamily: 'ubuntu' }}>Firman</p></b></Navbar.Brand>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />


          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <div onClick={() => (router.asPath != '/portfolio') ? setloading(true) : null}>
                <Link href='/portfolio' passHref>
                  <Nav.Link className='px-3 theme-nav' style={{fontFamily: 'ubuntu' }}>⚙️ Portfolio</Nav.Link>
                </Link>
              </div>
              <div onClick={() => (router.asPath != '/article') ? setloading(true) : null}>
                <Link href='/article' passHref>
                  <Nav.Link className='px-3 theme-nav' style={{fontFamily: 'ubuntu' }}>📖 Article</Nav.Link>
                </Link>
              </div>
              <div onClick={() => (router.asPath != '/about') ? setloading(true) : null}>
                <Link href='/about' passHref>
                  <Nav.Link className='px-3 theme-nav' style={{fontFamily: 'ubuntu' }}>👨‍💻 About</Nav.Link>
                </Link>
              </div>
              <div>
                <button type="button" className="btn button-theme p-0 rounded-circle" style={{width: 45, height: 43, marginLeft: '15px'}} onClick={() => switchThemeMode(theme, setTheme)}>
                  <div style={{paddingTop: '5px'}}>
                    <Image className='button-theme-icon' src={theme == ThemeMode.dark ? nightIcon : dayIcon} width={25} height={25} alt='' />
                  </div>
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent