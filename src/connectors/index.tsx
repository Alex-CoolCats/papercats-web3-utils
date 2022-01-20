import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { Web3ReactStore } from '@web3-react/types'
import type { WalletConnect } from '@web3-react/walletconnect'
import type { WalletLink } from '@web3-react/walletlink'
import { hooks as metaMaskHooks, metaMask, store as metaMaskStore } from './metaMask'
import { hooks as walletConnectHooks, store as walletConnectStore, walletConnect } from './walletConnect'
import { hooks as walletLinkHooks, store as walletLinkStore, walletLink } from './walletLink'

export const connectors: [
  MetaMask | WalletConnect | WalletLink,
  Web3ReactHooks,
  Web3ReactStore
][] = [
  [metaMask, metaMaskHooks, metaMaskStore],
  [walletConnect, walletConnectHooks, walletConnectStore],
  [walletLink, walletLinkHooks, walletLinkStore],
]
