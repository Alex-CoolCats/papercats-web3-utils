import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletLink } from '@web3-react/walletlink';
import { WalletConnect } from '@web3-react/walletconnect';

// @ts-ignore
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) {
    return 'MetaMask'
  } else if (connector instanceof WalletLink) {
    return 'Coinbase'
  } else if (connector instanceof WalletConnect) {
    return 'Wallet Connect'
  }else {
    return 'Unknown'
  }
};