import React from 'react';
import { IButtonProps } from '../..';
import { Container } from '../Container/Container';

export function Button({ children, disabled, colour, className, size, onClick, elementType, states, title }: IButtonProps) {
  return (
    <Container
      elementType={ elementType || 'button' }
      className={ className || [] }
      onClick={ onClick }
      disabled={ disabled || false }
      title={ title }
      states={ [{
      	className: 'disabled', condition: disabled || false
      }, {
      	className: size || '',
      	condition: typeof size === 'string' && size.length > 0
      }, {
      	className: colour || '',
      	condition: typeof colour === 'string' && colour.length > 0
      }].concat(states || []) }
    >
      { children }
    </Container>
  );
}

export default Button;