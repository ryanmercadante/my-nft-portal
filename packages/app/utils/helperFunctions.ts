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
