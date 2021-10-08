import React from 'react'
import { NavLink } from './NavLink'
import { StNav, StNavMenu, StNavBtn, StNavBtnLink, StBars } from './styles'

export interface NavbarProps {
  pathname: string
}

export const Navbar: React.FC<NavbarProps> = ({ pathname }) => {
  return (
    <StNav>
      <NavLink href='/' name='Logo' active={pathname === 'Home'} />
      <StBars />
      <StNavMenu>
        <NavLink href='/' name='Home' active={pathname === 'Home'} />
        <NavLink
          href='/ethereum'
          name='Ethereum'
          active={pathname === 'Ethereum'}
        />
        <NavLink
          href='/moonbase'
          name='Moonbase'
          active={pathname === 'Moonbase'}
        />
      </StNavMenu>
      <StNavBtn>
        <StNavBtnLink>Connect to Metamask</StNavBtnLink>
      </StNavBtn>
    </StNav>
  )
}
