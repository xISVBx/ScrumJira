import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './example';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    primary: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    primary: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};
