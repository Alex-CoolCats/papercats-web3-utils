import React from 'react';
import { IButtonProps, useConnect } from '../..';
import Button from '../Button';

export function Connect({ children, disabled, colour, className, size, onClick, elementType, states, title }: IButtonProps) {
  const { connect } = useConnect('4362cdc25f11459e8a6bba4789470b08');
  const click = () => {
    return connect().then(() => {
      if (onClick) {
        return onClick();
      }
    })
  }

  return (
    <Button
      disabled={ disabled }
      colour={ colour }
      className={ "pc-btn " + (className || "") }
      size={ size }
      onClick={ click }
      elementType={ elementType }
      states={ states }
      title={ title }
    >
      { children }
    </Button>
  )
};

export default Connect;