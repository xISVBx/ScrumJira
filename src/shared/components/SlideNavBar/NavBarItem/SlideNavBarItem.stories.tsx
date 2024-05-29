import React from 'react';
import { Meta, StoryFn   } from '@storybook/react';
import SlideNavBarItem, { SlideNavBarItemProps } from './SlideNavBarItem';

const meta: Meta<typeof SlideNavBarItem> = {
  title: 'SlideNavBar/Items/Item',
  component: SlideNavBarItem,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
const Template: StoryFn<SlideNavBarItemProps> = (args: SlideNavBarItemProps) => <SlideNavBarItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  itemName: 'Default Item',
};