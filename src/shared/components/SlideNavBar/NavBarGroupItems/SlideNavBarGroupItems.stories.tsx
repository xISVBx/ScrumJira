import React from 'react';
import { Meta, StoryFn   } from '@storybook/react';
import SlideNavBarGroupItems, { ISlideNavBarGroupItemsProps } from './SlideNavBarGroupItems';

const meta: Meta<typeof SlideNavBarGroupItems> = {
  title: 'SlideNavBar/Items/GroupItems',
  component: SlideNavBarGroupItems,
  argTypes: {
    nameGroup: { control: 'text' },
        items: { control: 'object' },
  },
};

export default meta;
const Template: StoryFn<ISlideNavBarGroupItemsProps> = (args: ISlideNavBarGroupItemsProps) => <SlideNavBarGroupItems {...args} />;

export const Default = Template.bind({});
Default.args = {
    nameGroup: 'Planeacion',
    items: [
        { itemName: 'Cronograma', onClick: () => console.log('Cronograma clicked') },
        { itemName: 'Tareas', onClick: () => console.log('Tareas clicked') },
    ],
};