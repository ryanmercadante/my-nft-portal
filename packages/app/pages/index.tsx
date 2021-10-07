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
import { getNftContract } from '../utils/helperFunctions'
import { CONTRACT_ADDRESS } from '../utils/constants'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [nftLink, setNftLink] = useState('')

  async function checkIfWalletConnected() {
    // Check that we have access to window global.
    if (typeof window === undefined) return

    // Check for access to window.ethereum.
    if (!window.ethereum) {
      console.log('Make sure you have MetaMask installed!')
      return
    }

    // Check if we're authorized to access the user's wallet.
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      })

      // Set the first authorized account (if any) in state variable
      if (accounts.length !== 0) {
        const firstAccount = accounts[0]
        setCurrentAccount(firstAccount)
      }

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
      // Request access to account.
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setCurrentAccount(accounts[0])

      setupEventListener()
    } catch (err) {
      console.error('Something went wrong connecting wallet:', err)
    }
  }

  function setupEventListener() {
    if (!window.ethereum) return

    const nftContract = getNftContract(ethers, window.ethereum)

    nftContract.on('NewEpicNFTMinted', (from, tokenId) => {
      setNftLink(
        `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
      )
    })
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
