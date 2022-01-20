import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import type { Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import type { Connector, Web3ReactState } from '@web3-react/types'
import { useCallback, useEffect, useState } from 'react'
import { CHAINS, getAddChainParameters, URLS } from '../chains'
import { connectors } from '../connectors'
import { getName } from '../utils'
import { useContract, useEth } from '../hooks'

import AbiFile from './abi.json';

function Status({
  connector,
  hooks: { useChainId, useAccounts, useError },
}: {
  connector: Connector
  hooks: Web3ReactHooks
}) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      <b>{getName(connector)}</b>
      <br />
      {error ? (
        <>
          🛑 {error.name ?? 'Error'}: {error.message}
        </>
      ) : connected ? (
        <>✅ Connected</>
      ) : (
        <>⚠️ Disconnected</>
      )}
    </div>
  )
}

function ChainId({ hooks: { useChainId } }: { hooks: Web3ReactHooks }) {
  const chainId = useChainId()

  return <div>Chain Id: {chainId ? <b>{chainId}</b> : '-'}</div>
}

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

function Accounts({ hooks: { useAccounts, useProvider, useENSNames } }: { hooks: Web3ReactHooks }) {
  const provider = useProvider()
  const accounts = useAccounts()
  const ENSNames = useENSNames(provider)

  const balances = useBalances(provider, accounts)

  return (
    <div>
      Accounts:
      {accounts === undefined
        ? ' -'
        : accounts.length === 0
        ? ' None'
        : accounts?.map((account, i) => (
            <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <b>{ENSNames?.[i] ?? account}</b>
              {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
            </ul>
          ))}
    </div>
  )
}

function MetaMaskSelect({ chainId, setChainId }: { chainId: number; setChainId?: (chainId: number) => void }) {
  return (
    <label>
      Chain:{' '}
      <select
        value={`${chainId}`}
        onChange={
          setChainId
            ? (event) => {
                setChainId(Number(event.target.value))
              }
            : undefined
        }
        disabled={!setChainId}
      >
        <option value={-1}>Default</option>
        {Object.keys(URLS).map((chainId) => (
          <option key={chainId} value={chainId}>
            {CHAINS[Number(chainId)].name}
          </option>
        ))}
      </select>
    </label>
  )
}

function MetaMaskConnect({
  connector,
  hooks: { useChainId, useIsActivating, useError, useIsActive },
}: {
  connector: MetaMask
  hooks: Web3ReactHooks
}) {
  const currentChainId = useChainId()
  const isActivating = useIsActivating()
  const error = useError()
  const active = useIsActive()

  const [desiredChainId, setDesiredChainId] = useState<number>(-1)

  const setChainId = useCallback(
    (chainId: number) => {
      setDesiredChainId(chainId)
      if (chainId !== -1 && chainId !== currentChainId) {
        return connector.activate(getAddChainParameters(chainId))
      }
    },
    [setDesiredChainId, currentChainId, connector]
  )

  if (error) {
    return (
      <>
        <MetaMaskSelect chainId={desiredChainId} setChainId={setChainId} />
        <br />
        <button
          onClick={() => connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))}
        >
          Try Again?
        </button>
      </>
    )
  } else if (active) {
    return (
      <>
        <MetaMaskSelect chainId={desiredChainId === -1 ? -1 : currentChainId} setChainId={setChainId} />
        <br />
        <button disabled>Connected</button>
      </>
    )
  } else {
    return (
      <>
        <MetaMaskSelect chainId={desiredChainId} setChainId={isActivating ? undefined : setChainId} />
        <br />
        <button
          onClick={
            isActivating
              ? undefined
              : () => connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
          disabled={isActivating}
        >
          {isActivating ? 'Connecting...' : 'Connect'}
        </button>
      </>
    )
  }
}

function GenericConnect({
  connector,
  hooks: { useIsActivating, useError, useIsActive },
}: {
  connector: Connector
  hooks: Web3ReactHooks
}) {
  const isActivating = useIsActivating()
  const error = useError()

  const active = useIsActive()

  if (error) {
    return <button onClick={() => connector.activate()}>Try Again?</button>
  } else if (active) {
    return (
      <button
        onClick={connector.deactivate ? () => connector.deactivate() : undefined}
        disabled={!connector.deactivate}
      >
        {connector.deactivate ? 'Disconnect' : 'Connected'}
      </button>
    )
  } else {
    return (
      <button onClick={isActivating ? undefined : () => connector.activate()} disabled={isActivating}>
        {isActivating ? 'Connecting...' : 'Connect'}
      </button>
    )
  }
}

function Connect({ connector, hooks }: { connector: Connector; hooks: Web3ReactHooks }) {
  return connector instanceof MetaMask ? (
    <MetaMaskConnect connector={connector} hooks={hooks} />
  ) : (
    <GenericConnect connector={connector} hooks={hooks} />
  )
}

function Panel({ connector, hooks, state }: { connector: Connector; hooks: Web3ReactHooks, state: Web3ReactState }) {
  const active = hooks.useIsActive()
  const web3 = hooks.useProvider()
  const account = hooks.useAccount()
  const contract = useContract(AbiFile, '0x34b30ace737ffe8112da5cf6bfcb86744e9bea87', web3);
  const eth = useEth(web3);

  if (contract && eth) {
    contract.methods.adopt(1).estimateGas({
      value: 500000000000000, // wei value of 0.0005 eth
      from: account
    }).then((gas) => {
      eth.getGasPrice().then((currentGasPrice: number) => {
        const data = {
          gas: parseInt(gas),
          gasPrice: parseInt(1.13 * currentGasPrice),
          from: account,
          value: 500000000000000
        };

        contract.methods.adopt(1).send(
          data
        ).once('transactionHash', (hash) => {
          console.log('transactionHash', hash);
        }).on('receipt', (receipt) => {
          if(receipt?.from == account) {
            console.log('receipt 1', receipt);
          }
        }).on('confirmation', (confNumber, receipt) => {
          console.log('confirmation', confNumber, receipt);
        }).on('error', (error) => {
          console.log('error', error);
        }).then((receipt) => {
          console.log('mined:', receipt);
        });
      });
    });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem',
      }}
    >
      <div>
        <Status connector={connector} hooks={hooks} />
        <br />
        <ChainId hooks={hooks} />
        <Accounts hooks={hooks} />
        <br />
      </div>
      <Connect connector={connector} hooks={hooks} />

      { active && <p>Connected!</p>}
    </div>
  )
}

export default function Test() {
  return (
    <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
      {connectors.map(([connector, hooks, state], i) => (
        <Panel connector={ connector } hooks={ hooks } state={ state } key={ i } />
      ))}
    </div>
  )
}
