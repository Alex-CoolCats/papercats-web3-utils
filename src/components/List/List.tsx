import React from 'react';
import { IGenericElementProps, IJustChildrenProps } from '../../utils/config';
import Container from "../Container";

export function Item({ children }: IJustChildrenProps) {
  // @ts-ignore
  if (children.type === 'li') {
    return (
      <>{ children }</>
    )
  }

  return (
    <Container elementType='li'>
      { children }
    </Container>
  );
};

export function List({ children, className, elementType: ElementType = 'ul', ...rest }: IGenericElementProps) {
  const getContent = () => {
    if (Array.isArray(children)) {
      return children.map((item: string, i: number) => {
        return (
          <Item key={ i }>
            { children[i] }
          </Item>
        )
      });
    }

    return (
      <Item>
        { children }
      </Item>
    );
  };

  return (
    <Container elementType={ ElementType } className={ className || ('pc__list pc__list--' + ElementType) } {...rest}>
      { getContent() }
    </Container>
  );
};

export default List;