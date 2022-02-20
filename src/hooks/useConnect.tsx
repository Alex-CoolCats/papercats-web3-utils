global.Buffer = global.Buffer || require("buffer").Buffer;

import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { getChainData, IChainData, IConnectConfig } from "..";

import WalletConnect from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

export const getProviderOptions = (infuraId: string, appName?: string) => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnect,
      options: {
        infuraId
      }
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: appName || "Web3 Modal",
        infuraId
      }
    }
  };
  return providerOptions;
};

export function useConnect(infuraId: string, config?: IConnectConfig) {
  const [address, setAddress] = useState<string>('');
  const [web3, setWeb3] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [provider, setProvider] = useState<any>(false);
  const [chainData, setChainData] = useState<IChainData>(
    getChainData(infuraId, config?.chainId || 1)
  );
  const providerOptions = getProviderOptions(infuraId, config?.appName || 'Paper Cats Connect');

  useEffect(() => {
    if (provider) {
      setWeb3(new Web3(provider));

      if (provider.networkVersion !== chainData.network_id) {
        setError(new Error('Wrong network'));
      }

      provider.on('close', async () => {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        await this.web3Modal.clearCachedProvider();
        setWeb3(false);
        setProvider(false);

        if (config?.onClose) {
          config.onClose();
        }
      });

      provider.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0]);

        if (config?.accountsChanged) {
          return config.accountsChanged(accounts);
        }
      });

      provider.on("chainChanged", async (chainId: number) => {
        setChainData(getChainData(infuraId, chainId));

        if (provider.networkVersion !== chainData.network_id) {
          setError(new Error('Wrong network'));
        }

        if (config?.chainChanged) {
          return config.chainChanged(chainId);
        }
      });

      provider.on("networkChanged", (networkId: number) => {
        setChainData(getChainData(infuraId, networkId));

        if (config?.networkChanged) {
          return config.networkChanged(networkId);
        }
      });
    }
  }, [provider]);

  const connect = () => {
    const web3Modal = new Web3Modal({
      network: chainData.network,
      cacheProvider: true,
      providerOptions
    });

    return web3Modal.connect().then((prov: any) => {
      setProvider(prov);

      return prov;
    })
  };

  return {
    web3,
    provider,
    chainData,
    address,
    error,

    connect
  }
};

export default useConnect;