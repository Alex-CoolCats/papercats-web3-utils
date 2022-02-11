import React from 'react';
import { IGenericElementProps } from '../..';
import List from '../List';
import "./StyledList.scss";
export function StyledList({ children, className, elementType: ElementType = 'ul', ...rest }: IGenericElementProps) {
  return (
    <List
      className={ "pc-list " + (className || "") }
      elementType={ ElementType }
      {...rest}
    >
      { children }
    </List>
  )
};
export default StyledList;