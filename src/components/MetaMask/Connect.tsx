import React, { ReactNode } from 'react';
import { getAddChainParameters } from '../../chains';
import { connectors } from '../../connectors'

import { Button } from '../Button/Button';

export function Connect({
  defaultChainId,
  children
}: {
  defaultChainId: number,
  children: ReactNode
}) {
  const connector = connectors[0][0];
  const { useIsActivating, useError, useIsActive } = connectors[0][1];
  
  const isActivating = useIsActivating()
  const error = useError()
  const active = useIsActive()

  const connect = () => {
    return connector.activate(
      defaultChainId === -1 ? undefined : getAddChainParameters(defaultChainId)
    );
  };

  if (error) {
    return (
      <Button
        onClick={ connect }
        disabled={ isActivating }
      >
        Try Again?
      </Button>
    )
  } else if (active) {
    return children;
  } else {
    return (
      <Button
        onClick={ connect }
        disabled={ isActivating }
      >
        Connect
      </Button>
    )
  }
}

export default Connect;