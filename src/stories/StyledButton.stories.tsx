import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StyledButton } from '../components/Styled/StyledButton';

export default {
  title: 'Styled Button',
  component: StyledButton,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false
    },
    colour: { control: "select", options: ["", "warning", "success", "info"] }
  },
} as ComponentMeta<typeof StyledButton>;

export const StyledButtonExample: ComponentStory<typeof StyledButton> = (args) => <StyledButton {...args}>Styled Button</StyledButton>;