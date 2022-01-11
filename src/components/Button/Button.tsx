import React from 'react';
import { Container } from '../Container/Container';
import "./Button.scss";

export type ButtonProps = {
	children: React.ReactNode,
	disabled?: boolean,
	colour?: string,
	className?: string,
	size?: string,
	onClick?: Function,
	elementType?: string,
	states?: any,
  title?: string
};

export function Button({ children, disabled, colour, className, size, onClick, elementType, states, title }: ButtonProps) {
  return (
    <Container
      elementType={ elementType || 'button' }
      className={ className || ['pc__btn'] }
      onClick={ onClick }
      disabled={ disabled || false }
      title={ title }
      states={ [{
      	className: 'pc__btn--disabled', condition: disabled || false
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