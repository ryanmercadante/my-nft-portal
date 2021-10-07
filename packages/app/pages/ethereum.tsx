import { ethers } from 'ethers'

const providerURL = 'https://rpc.testnet.moonbeam.network'

export default function Ethereum() {
  // Define Provider
  const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1287,
    name: 'moonbase-alphanet',
  })

  return <h1>Ethereum</h1>
}
