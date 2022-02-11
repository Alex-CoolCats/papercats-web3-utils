import React from 'react';
import { IButtonProps } from '../..';
import Button from '../Button';
import "./StyledButton.scss";
export function StyledButton({ children, disabled, colour, className, size, onClick, elementType, states, title }: IButtonProps) {
  return (
    <Button
      disabled={ disabled }
      colour={ colour }
      className={ "pc-btn " + (className || "") }
      size={ size }
      onClick={ onClick }
      elementType={ elementType }
      states={ states }
      title={ title }
    >
      { children }
    </Button>
  )
};
export default StyledButton;