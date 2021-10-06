import { MyEpicNFT, MyEpicNFT__factory } from '@nft-portal/hardhat'
import { CONTRACT_ADDRESS } from './constants'

export function getNftContract(_ethers: any, _ethereum: any): MyEpicNFT {
  const provider = new _ethers.providers.Web3Provider(_ethereum)
  const signer = provider.getSigner()
  return MyEpicNFT__factory.connect(CONTRACT_ADDRESS, signer)
}
