import type { Web3ReactHooks } from '@web3-react/core';
import type { Connector } from '@web3-react/types';
import { hooks as metaMaskHooks, metaMask } from './metaMask';
import { hooks as walletLinkHooks, walletLink } from './walletLink';
import { getName } from '../utils';

export const connectors: [Connector, Web3ReactHooks, string][] = [
  [metaMask, metaMaskHooks, getName(metaMask)],
  [walletLink, walletLinkHooks, getName(walletLink)],
];