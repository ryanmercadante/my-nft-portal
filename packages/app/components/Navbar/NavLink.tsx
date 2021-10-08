import styled from '@emotion/styled'
import Link from 'next/link'
import { StNavLink } from './styles'

export interface NavLinkProps {
  href: string
  name: string
  active: boolean
}

export const NavLink: React.FC<NavLinkProps> = ({ href, name, active }) => {
  return (
    <Link href={href} passHref>
      <StNavLink active={active}>{name}</StNavLink>
    </Link>
  )
}
