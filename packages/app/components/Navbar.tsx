import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/ethereum'>
          <a>Ethereum</a>
        </Link>
      </li>
      <li>
        <Link href='/moonriver'>
          <a>Moonriver</a>
        </Link>
      </li>
    </ul>
  )
}
