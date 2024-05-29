import * as React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { Draggable } from '../../../DndKit/Draggable';

export interface IBoardCardProps {
    key:number
}

const BoardCard: React.FunctionComponent<IBoardCardProps> = ({key}) => {
    return (
        <Draggable id={key}>
            <div className='h-[100px] bg-background-dark rounded-md shadow-2xl hover:bg-red-500'>
                
            </div>
        </Draggable>
    );
};

export default BoardCard;
