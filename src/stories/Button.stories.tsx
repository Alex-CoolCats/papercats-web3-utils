import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false
    }
  },
} as ComponentMeta<typeof Button>;

export const Basic: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;