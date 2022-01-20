import { MetaMask } from './MetaMask';
import { WalletConnect } from './WalletConnect';
import { WalletLink } from './WalletLink';

export default function useIsConnected() {
  const MetaMaskIsConnected = MetaMask.useIsActive()
  const WalletConnectIsConnected = WalletConnect.useIsActive()
  const WalletLinkIsConnected = WalletLink.useIsActive()
  return MetaMaskIsConnected || WalletConnectIsConnected || WalletLinkIsConnected;
}