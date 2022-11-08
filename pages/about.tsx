import { Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import styles from '../styles/About.module.css'
import { RiFacebookBoxFill, RiGithubFill, RiWhatsappFill, RiInstagramFill, RiLinkedinFill, RiMailFill } from 'react-icons/ri'

const AboutPage = () => {
  const meta_name = 'About | Firman ✋'
  return (
    <>
      <Head>
        <title>{meta_name}</title>

        <meta itemProp="name" content={meta_name}/>

        <meta property="og:title" content={meta_name}/>

        <meta name="twitter:title" content={meta_name}/>
      </Head>

      <Container className={styles.wrap} style={{ fontFamily: 'Source Sans Pro', marginTop: '5.5%', minHeight: '550px' }}>
        <b><p style={{ fontSize: '35px', fontWeight: 'bold' }}>About.</p></b>
        <p style={{ width: '70%' }}>Who is Firman ? He is a Good Programmer, he also like cat (especially fat), book (maybe he like social topic). Last I know Firman enthusiastic in 🖥️ Web App and 📱 Mobile App and now learning about Frontend Framework (Next JS). <br /> He located in 🇮🇩 Indonesia exactly in <a href="https://goo.gl/maps/ELwSc5H5W71MF2PWA" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Banyuwangi</a> and last education firman in <a href="https://goo.gl/maps/TRnoewqCQz3966uv5" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>SMKN 1 Banyuwangi</a></p>

        <b><p className='mt-5' style={{ fontSize: '25px', fontWeight: 'bold' }}>Used Technology</p></b>
        <p style={{ width: '70%' }}>
          Web Development (<a href="https://www.djangoproject.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Django</a>, <a href="https://laravel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Laravel</a>, <a href="https://www.fastify.io" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Fastify</a>, <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Next</a>)
          <br />
          Mobile Development (<a href="https://flutter.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Flutter</a>)
          <br />
          Programming Language (<a href="https://www.python.org" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Python</a>, <a href="https://www.javascript.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Javascript</a>, <a href="https://dart.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Dart</a>, <a href="https://www.php.net" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>PHP</a>)
        </p>

        <b><p className='mt-5' style={{ fontSize: '25px', fontWeight: 'bold' }}>Want discuss project or just talk ?</p></b>
        <p style={{ width: '70%' }}>You can contact in there</p>
        <p>
          <a href='https://www.facebook.com/firman.lestari.12' target="_blank" rel="noopener noreferrer" className='socialmedia link-without-effect'><b><RiFacebookBoxFill /> <span className='align-middle'>Facebook</span></b></a>
          <br />
          <a href='https://www.instagram.com/firmanlestaridev' target="_blank" rel="noopener noreferrer" className='socialmedia link-without-effect'><b><RiInstagramFill /> <span className='align-middle'>Instagram</span></b></a>
          <br />
          <a href='https://wa.me/082141950044' target="_blank" rel="noopener noreferrer" className='socialmedia link-without-effect'><b><RiWhatsappFill /> <span className='align-middle'>Whatsapp</span></b></a>
          <br />
          <a href='https://github.com/zeetec20' target="_blank" rel="noopener noreferrer" className='socialmedia link-without-effect'><b><RiGithubFill /> <span className='align-middle'>Github</span></b></a>
          <br />
          <a href='https://www.linkedin.com/in/firmanlestari' target="_blank" rel="noopener noreferrer" className='socialmedia link-without-effect'><b><RiLinkedinFill /> <span className='align-middle'>Linkedin</span></b></a>
          <br />
          <a href='mailto:jusles363@gmail.com' className='socialmedia link-without-effect'><b><RiMailFill /> <span className='align-middle'>Email</span></b></a>
        </p>
      </Container>
    </>
  )
}

export default AboutPage