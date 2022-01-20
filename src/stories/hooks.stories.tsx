import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useIsConnected, useAccount } from '../hooks';

function Empty() {};

function IsConnected() {
  const connected = useIsConnected();
  return (
    <>{ connected ? 'Connected!' : 'Not connected' }</>
  )
};

function UseAccount() {
  const account = useAccount();
  return (
    <>{ account ? account : 'Not connected' }</>
  )
};

const IsConnectedTemplate: ComponentStory<typeof IsConnected> = () => <IsConnected />;
export const IsConnectedExample = IsConnectedTemplate.bind({});

const AccountTemplate: ComponentStory<typeof UseAccount> = () => <UseAccount />;
export const AccountExample = AccountTemplate.bind({});

export default {
  title: 'Hooks',
  component: Empty
} as ComponentMeta<typeof Empty>;