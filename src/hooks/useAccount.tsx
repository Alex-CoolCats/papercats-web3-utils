import { MetaMask } from './MetaMask';
import { WalletConnect } from './WalletConnect';
import { WalletLink } from './WalletLink';

export default function useIsConnected() {
  const MetaMaskAccount = MetaMask.useAccount()
  const WalletConnectAccount = WalletConnect.useAccount()
  const WalletLinkAccount = WalletLink.useAccount()
  return MetaMaskAccount || WalletConnectAccount || WalletLinkAccount;
}