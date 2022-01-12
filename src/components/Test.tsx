import React from 'react';
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask'
import { connectors } from "../connectors";
import { getAddChainParameters } from '../chains';

const metaMask = connectors[0];

function Status({
  hooks: { useChainId, useAccounts, useError },
  name
}: {
  hooks: Web3ReactHooks,
  name: string
}) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      <p>
        <strong>{ name }</strong>
      </p>
      <p>
        {error ? (
          <>
            🛑 {error.name ?? 'Error'}: {error.message}
          </>
        ) : connected ? (
          <>✅ Connected</>
        ) : (
          <>⚠️ Disconnected</>
        )}
      </p>
    </div>
  )
}

function ChainId({ hooks: { useChainId } }: { hooks: Web3ReactHooks }) {
  const chainId = useChainId()

  return <div>Chain Id: {chainId ? <b>{chainId}</b> : '-'}</div>
}


function MetaMaskConnect({
  connector,
  hooks: { useChainId, useIsActivating, useError, useIsActive, useAccounts },
}: {
  connector: MetaMask
  hooks: Web3ReactHooks
}) {
  const currentChainId = useChainId()
  const accounts = useAccounts()
  const connected = Boolean(currentChainId && accounts)
  const isActivating = useIsActivating()
  const error = useError()
  const active = useIsActive()
  const desiredChainId = 4;

  if (error) {
    return (
      <>
        <button
          onClick={() => connector.activate(getAddChainParameters(desiredChainId))}
        >
          Try Again?
        </button>
      </>
    )
  } else if (active) {
    return (
      <>
        <button disabled>Connected</button>
      </>
    )
  } else {
    return (
      <>
        <button
          onClick={
            () => connector.activate(getAddChainParameters(desiredChainId))
          }
        >
          {isActivating ? 'Connecting...' : 'Connect'}
        </button>
      </>
    )
  }
}

export function Test() {
  return (
    <>
      <Status hooks={ metaMask[1] } name={ metaMask[2] } />
      <ChainId hooks={ metaMask[1] } />
      { metaMask[0] instanceof MetaMask && <MetaMaskConnect connector={ metaMask[0] } hooks={ metaMask[1] } /> }
    </>
  );
}

export default Test;