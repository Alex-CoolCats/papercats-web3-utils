import { useMemo } from 'react'
import useEth from './useEth';

export default function useContract(AbiFile, Address, web3) {
  const eth = useEth(web3);
  return useMemo(() => {
    if (AbiFile && Address && eth) {
      return new eth.Contract(AbiFile, Address);
    }
  }, [AbiFile, Address, eth]);
}