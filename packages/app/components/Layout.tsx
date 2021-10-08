import { useRouter } from 'next/router'
import { Container, Main } from '../styles'
import { cleanPathname } from '../utils/helperFunctions'
import { Pathname } from '../utils/types'
import { Footer } from './Footer'
import { Head } from './Head'
import { Navbar } from './Navbar'

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const pathname = cleanPathname(router.pathname as Pathname)

  return (
    <>
      <Navbar pathname={pathname} />
      <Container>
        <Head
          title={`Square NFT | ${pathname}`}
          content='Website to mint Square NFTs on Ethereum or Moonriver'
        />
        <Main>{children}</Main>
        <Footer />
      </Container>
    </>
  )
}
