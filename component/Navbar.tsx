import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { memo, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/dist/client/router'
import { switchThemeMode } from '@/store/themeAction'
import * as atom from '@/store/atom'
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Image from 'next/image'
import nightIcon from '../public/night.png'
import dayIcon from '../public/day.png'
import { ThemeMode } from '@/types'
import { useTransition, animated } from '@react-spring/web'

const ThemeButton = () => {
  const [theme, setTheme] = useRecoilState(atom.theme)
  const transitions = useTransition(theme == ThemeMode.dark, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 }
  })

  return (
    <button type="button" className="btn button-theme p-0 rounded-circle" style={{ width: 45, height: 43, marginLeft: '15px' }} onClick={() => switchThemeMode(theme, setTheme)}>
      <div style={{ paddingTop: '5px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {transitions((styles, item) => item ?
          <animated.div style={{ opacity: styles.opacity, position: 'absolute' }}><Image className='button-theme-icon' src={nightIcon} width={25} height={25} alt='' /></animated.div> :
          <animated.div style={{ opacity: styles.opacity, position: 'absolute' }}><Image className='button-theme-icon' src={dayIcon} width={25} height={25} alt='' /></animated.div>)}
      </div>
    </button>
  )
}

interface NavLinkInterface {
  href: string,
  nav: string,
  router: NextRouter,
  setLoading: SetterOrUpdater<boolean>
}

const NavLink = ({ href, nav, router, setLoading }: NavLinkInterface) => {
  return (
    <div onClick={(router.asPath != href) ? () => setLoading(true) : undefined}>
      <Link href={href} passHref>
        <Nav.Link className='px-3 theme-nav' style={{ fontFamily: 'ubuntu' }}>{nav}</Nav.Link>
      </Link>
    </div>
  )
}

const NavbarLoading = () => {
  const loading = useRecoilValue(atom.navbarLoading)
  return (
    <div className="wrap-loading position-absolute w-100" style={{ left: 0, right: 0, overflow: 'hidden' }}>
      <div className={`loading ${loading ? 'loading-visible' : 'loading-hidden'}`}></div>
    </div>
  )
}

const NavbarComponent = () => {
  const router = useRouter()
  const setLoading = useSetRecoilState(atom.navbarLoading)
  
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <>
      <NavbarLoading/>
      <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}>
        <Container>
          <div className='mt-5' onClick={() => (router.asPath != '/') ? setLoading(true) : null}>
            <Link href="/" passHref>
              <Navbar.Brand className='theme-brand'><b><p style={{ fontFamily: 'ubuntu' }}>Firman</p></b></Navbar.Brand>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <NavLink href='/portfolio' nav='⚙️ Portfolio' router={router} setLoading={setLoading} />
              <NavLink href='/article' nav='📖 Article' router={router} setLoading={setLoading} />
              <NavLink href='/about' nav='👨‍💻 About' router={router} setLoading={setLoading} />
              <div>
                <ThemeButton />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default memo(NavbarComponent)