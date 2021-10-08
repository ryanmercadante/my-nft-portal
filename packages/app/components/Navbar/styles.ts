import styled from '@emotion/styled'
import { FaBars } from 'react-icons/fa'

export const StNav = styled.nav`
  background: #000;
  height: 80;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`

export const StNavLink = styled.a<{ active: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  color: ${(props) => (props.active ? '#256ce1' : '#fff')};
`

export const StBars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%)
    font-size: 1.8rem;
    cursor: pointer;
  }
`
export const StNavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const StNavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const StNavBtnLink = styled.button`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`
