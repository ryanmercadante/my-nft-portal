import { MyEpicNFT, MyEpicNFT__factory } from '@nft-portal/hardhat'
import { CONTRACT_ADDRESS } from './constants'
import { Pathname } from './types'

export function getNftContract(_ethers: any, _ethereum: any): MyEpicNFT {
  const provider = new _ethers.providers.Web3Provider(_ethereum)
  const signer = provider.getSigner()
  return MyEpicNFT__factory.connect(CONTRACT_ADDRESS, signer)
}

export function cleanPathname(_pathname: Pathname) {
  if (_pathname === '/') return 'Home'

  const cleanedPathname = _pathname.charAt(1).toUpperCase() + _pathname.slice(2)
  return cleanedPathname
}

export function isEthInjected(window: Window) {
  // Check that we have access to window global.
  if (typeof window === undefined) return false

  // Check for access to window.ethereum.
  if (!window.ethereum) {
    console.log('Make sure you have MetaMask installed!')
    return false
  }

  return true
}

export async function getAndSetAccount(
  window: Window,
  callback: (value: React.SetStateAction<string>) => void
) {
  const accounts = await window.ethereum.request({
    method: 'eth_accounts',
  })

  // Set the first authorized account (if any) in state variable
  if (accounts.length !== 0) {
    const firstAccount = accounts[0]
    callback(firstAccount)
  }
}
