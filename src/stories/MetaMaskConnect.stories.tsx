import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Connect from '../components/MetaMask/Connect';

export default {
  title: 'Connect with Metamask',
  component: Connect
} as ComponentMeta<typeof Connect>;

const Template: ComponentStory<typeof Connect> = () => <Connect defaultChainId={ 4 }>Connected!</Connect>;

export const Example = Template.bind({});