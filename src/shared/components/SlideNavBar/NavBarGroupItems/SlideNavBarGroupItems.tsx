import * as React from 'react';
import SlideNavBarItem, { SlideNavBarItemProps } from '../NavBarItem/SlideNavBarItem';

export interface ISlideNavBarGroupItemsProps {
    nameGroup: string;
    items: SlideNavBarItemProps[];
}

const SlideNavBarGroupItems: React.FunctionComponent<ISlideNavBarGroupItemsProps> = ({ nameGroup, items }) => {
    return (
        <div className='bg-background-dark pb-2'>
            <h5 className='text-white font-light text-sm font-semibold mb-3 '>{nameGroup}</h5>
            {items.map(item =>
                <SlideNavBarItem itemName={item.itemName} onClick={item.onClick} />
            )}
        </div>
    );
};

export default SlideNavBarGroupItems;
