import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletLink } from '@web3-react/walletlink';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) {
    return 'MetaMask'
  } else if (connector instanceof WalletLink) {
    return 'Coinbase'
  } else {
    return 'Unknown'
  }
};