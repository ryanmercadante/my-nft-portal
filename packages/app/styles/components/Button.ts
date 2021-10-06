import styled from '@emotion/styled'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`

export const ConnectButton = styled.button`
  padding: 1rem 2rem;
  letter-spacing: 1.5px;
  background-color: #00d9ff;
  border-radius: 5px;
  text-decoration: none;
  letter-spacing: 1.5px;
  color: black;
  font-size: 1em;
  cursor: pointer;
`

export const OpenSeaButton = styled.a`
  padding: 1rem 2rem;
  letter-spacing: 1.5px;
  background-color: #00d9ff;
  border-radius: 5px;
  text-decoration: none;
  letter-spacing: 1.5px;
  color: black;
  font-size: 1em;
  cursor: pointer;
  margin: 0 1rem;
`

export const OpenSeaCollectionButton = styled(OpenSeaButton)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`

export const MintButton = styled.button`
  padding: 1rem 2rem;
  border: 3px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1.5px;
  color: black;
  font-size: 1em;
  border-radius: 5px;
  background-color: #00d9ff;
  cursor: pointer;
  animation: glow 1500ms infinite;

  &:hover {
    animation: none;
    background-color: #0a9fda;
    box-shadow: 0 0 3px #0a9fda;
  }

  @keyframes glow {
    0% {
      background-color: #0ad2e0;
      box-shadow: 0 0 3px #0ad2e0;
    }
    50% {
      background-color: #00d9ff;
      box-shadow: 0 0 40px #00d9ff;
    }
    100% {
      background-color: #0a9fda;
      box-shadow: 0 0 3px #0a9fda;
    }
  }
`
