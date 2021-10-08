import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import {
  ButtonContainer,
  ConnectButton,
  Header,
  MintButton,
  OpenSeaButton,
  OpenSeaCollectionButton,
  SubHeader,
} from '../styles'
import {
  getAndSetAccount,
  getNftContract,
  isEthInjected,
} from '../utils/helperFunctions'
import { CONTRACT_ADDRESS } from '../utils/constants'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [nftLink, setNftLink] = useState('')

  function setupEventListener() {
    if (!window.ethereum) return

    const nftContract = getNftContract(ethers, window.ethereum)

    nftContract.on('NewEpicNFTMinted', (from, tokenId) => {
      setNftLink(
        `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
      )
    })
  }

  async function checkIfWalletConnected() {
    if (!isEthInjected(window)) return

    // Check if we're authorized to access the user's wallet.
    try {
      await getAndSetAccount(window, (account) => setCurrentAccount(account))

      setupEventListener()
    } catch (err) {
      console.error(
        'Something went wrong requesting accounts from ethereum:',
        err
      )
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert('Install MetaMask!')
      return
    }

    try {
      await getAndSetAccount(window, (account) => setCurrentAccount(account))

      setupEventListener()
    } catch (err) {
      console.error('Something went wrong connecting wallet:', err)
    }
  }

  async function mint() {
    if (!window.ethereum) return

    setNftLink('')

    const nftContract = getNftContract(ethers, window.ethereum)

    try {
      let nftTx = await nftContract.makeAnEpicNFT()

      setIsLoading(true)
      await nftTx.wait()
      setIsLoading(false)
    } catch (err) {
      console.error('Something went wrong minting NFT:', err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkIfWalletConnected()
  }, [])

  return (
    <div>
      <Header>Square NFT</Header>
      <SubHeader>
        Each unique. Each beautiful. Mint your Square NFT today!
      </SubHeader>
      <OpenSeaCollectionButton
        href={`https://testnets.opensea.io/collection/squarenft-uxfr0vzno2`}
        target='_blank'
        rel='noopener noreferrer'
      >
        🌊 View Collection on OpenSea
      </OpenSeaCollectionButton>
      <ButtonContainer>
        {currentAccount === '' ? (
          <ConnectButton onClick={connectWallet}>
            Connect to Wallet
          </ConnectButton>
        ) : (
          <>
            {nftLink !== '' && (
              <OpenSeaButton
                href={nftLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                Go see your NFT!
              </OpenSeaButton>
            )}
            <MintButton onClick={mint}>
              {isLoading ? 'Minting...' : 'Mint NFT'}
            </MintButton>
          </>
        )}
      </ButtonContainer>
    </div>
  )
}
