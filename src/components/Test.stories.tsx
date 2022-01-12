import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Test from './Test';

export default {
  title: 'Test',
  component: Test
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = () => <Test />;

export const BasicExample = Template.bind({});