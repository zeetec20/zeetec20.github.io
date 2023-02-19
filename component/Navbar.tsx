import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { MouseEventHandler, memo, useEffect, useMemo, useState } from 'react'
import { NextRouter, useRouter } from 'next/dist/client/router'
import { switchThemeMode } from '@/store/action/switchThemeMode'
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Image from 'next/image'
import nightIcon from '../public/night.png'
import dayIcon from '../public/day.png'
import { ThemeMode } from '@/types'
import { useTransition, animated } from '@react-spring/web'
import { theme as themeAtom } from '@/store/theme'
import { navbarLoading } from '@/store/navbarLoading'

const ThemeButton = () => {
  const [theme, setTheme] = useRecoilState(themeAtom)
  const transitions = useTransition(theme == ThemeMode.dark, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 }
  })

  return (
    <button type="button" className="btn button-theme p-0 rounded-circle d-flex justify-content-center align-items-center" style={{ width: 45, height: 43, marginLeft: '15px' }} onClick={() => switchThemeMode(theme, setTheme)}>
      {transitions((styles, item) => item ?
        <animated.div style={{ opacity: styles.opacity, position: 'absolute' }}>
          <Image className='button-theme-icon' src={nightIcon} width={25} height={25} alt='' />
        </animated.div> :
        <animated.div style={{ opacity: styles.opacity, position: 'absolute' }}>
          <Image className='button-theme-icon' src={dayIcon} width={25} height={25} alt='' />
        </animated.div>
      )}
    </button>
  )
}

interface NavLinkInterface {
  href: string
  nav: string
  router: NextRouter
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined
}

const NavLink = ({ href, nav, router, onClick }: NavLinkInterface) => {
  return (
    <Link href={href} onClick={undefined} passHref legacyBehavior>
      <Nav.Link className='px-3 theme-nav' style={{ fontFamily: 'ubuntu' }}>{nav}</Nav.Link>
    </Link>
  )
}

const NavbarLoading = () => {
  const loading = useRecoilValue(navbarLoading)
  return (
    <div className="wrap-loading position-absolute w-100" style={{ left: 0, right: 0, overflow: 'hidden' }}>
      <div className={`loading ${loading ? 'loading-visible' : 'loading-hidden'}`}></div>
    </div>
  )
}

const NavbarComponent = () => {
  const router = useRouter()
  const setLoading = useSetRecoilState(navbarLoading)

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <>
      <NavbarLoading />
      <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}>
        <Container>
          <Link className='mt-5' style={{ textDecoration: 'none' }} onClick={() => (router.asPath != '/') ? setLoading(true) : null} href="/" passHref>
            <Navbar.Brand className='theme-brand'><b><p style={{ fontFamily: 'ubuntu' }}>Firman</p></b></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <NavLink href='/portfolio' nav='⚙️ Portfolio' router={router} onClick={() => setLoading(true)} />
              <NavLink href='/article' nav='📖 Article' router={router} onClick={() => setLoading(true)} />
              <NavLink href='/about' nav='👨‍💻 About' router={router} onClick={() => setLoading(true)} />
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