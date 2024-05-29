import * as React from 'react';
import BoardColumn, { IBoardColumnProps } from '../BoardColumn/BoardColumn';
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Droppable } from '../../../DndKit/Droppable';

interface IBoardProps {
    columns: IBoardColumnProps[]
}



const Board: React.FunctionComponent<IBoardProps> = ({ columns }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (
        <div className='w-full flex flex-row space-x-2 overflow-x-auto pb-2 h-[calc(100vh-175px)]'>
            <DndContext collisionDetection={closestCorners} >
                {columns.map((column, index) =>
                    <Droppable key={index} id={index}>
                        <BoardColumn name={column.name} key={column.key} cards={column.cards} />
                    </Droppable>)}
            </DndContext>
        </div>
    );
};

export default Board;
