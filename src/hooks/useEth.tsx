import { useMemo } from 'react'
import Web3 from "web3";

export default function useEth(web3) {
  return useMemo(() => {
    if (web3 && web3.provider) {
      const _web3 = new Web3(web3.provider);
      return _web3.eth;
    }
  }, [web3]);
}