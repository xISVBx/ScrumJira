import React from 'react';

export interface SlideNavBarItemProps {
  itemName: String;
  onClick: () => void;
}

const SlideNavBarItem: React.FC<SlideNavBarItemProps> = ({ itemName, onClick }) => {

  return (
    <button className='px-2 py-2 bg-background-dark hover:bg-background-light w-full overflow-hidden flex rounded-md' onClick={onClick}>
      <span className='text-white font-light hover:bg' style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {itemName}
      </span>
    </button>
  );
};

export default SlideNavBarItem;
