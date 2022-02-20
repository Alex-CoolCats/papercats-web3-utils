export interface IIndexable {
  [key: string]: any;
};

export type TChildNode = React.ReactNode | React.ReactElement;

export interface IGenericElementProps {
  children: TChildNode;
  className?: string;
  elementType?: string;
};

export interface IJustChildrenProps {
  children: TChildNode;
};

export interface IButtonProps {
	children: React.ReactNode;
	disabled?: boolean;
	colour?: string;
	className?: string;
	size?: string;
	onClick?: Function;
	elementType?: string;
	states?: any;
  title?: string;
};

export interface IConnectConfig {
	chainId: number,
  appName?: string,
  onClose?: Function,
  accountsChanged?: Function,
  chainChanged?: Function,
  networkChanged?: Function
};

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
};

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
};