import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Connect } from '../components/Connect/Connect';

export default {
  title: 'Connect',
  component: Connect,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false
    }
  },
} as ComponentMeta<typeof Connect>;

export const Basic: ComponentStory<typeof Connect> = (args) => <Connect {...args}>Connect</Connect>;