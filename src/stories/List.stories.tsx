import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import List from '../components/List';

export default {
  title: 'List',
  component: List
} as ComponentMeta<typeof List>;

export const UnorderedList: ComponentStory<typeof List> = (args) => {
  return (
    <List>
      Item 1
    </List>
  );
}

export const OrderedList: ComponentStory<typeof List> = (args) => {
  return (
    <List elementType='ol'>
      <strong>Item 1</strong>
      <>Item 2</>
      <strong>Item 3</strong>
      <strong>Item 4</strong>
      <strong>Item 5</strong>
    </List>
  );
}

export const OrderedListWithCustomClass: ComponentStory<typeof List> = (args) => {
  return (
    <List elementType='ol' className='customlist'>
      <li>Item 1</li>
      <li>Item 2</li>
      <strong>Item 3</strong>
      <strong>Item 4</strong>
      <strong>Item 5</strong>
    </List>
  );
}