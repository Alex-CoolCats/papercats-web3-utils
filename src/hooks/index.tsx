import useContract from "./useContract";
import useEth from "./useEth";
import useIsConnected from "./useIsConnected";
import useAccount from "./useAccount";
import MetaMaskHooks from "./MetaMask";
import WalletConnectHooks from "./WalletConnect";
import WalletLinkHooks from "./WalletLink";

export default {
  useContract: useContract,
  useEth: useEth,
  useIsConnected: useIsConnected,
  useAccount: useAccount,
  MetaMaskHooks: MetaMaskHooks,
  WalletConnectHooks: WalletConnectHooks,
  WalletLinkHooks: WalletLinkHooks
}