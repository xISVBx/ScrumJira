import * as React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export interface IBoardCardProps {
    key: UniqueIdentifier
}

type ItemsType = {
    id: UniqueIdentifier;
    title: string;
};

const BoardCard: React.FunctionComponent<ItemsType> = ({ id, title }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'item',
        },
    });
    const baseClasses = 'min-h-[100px] bg-background-dark rounded-md shadow-2xl hover:opacity-80 w-full p-2 relative';
    // Si está siendo arrastrado, añadir clase de opacidad
    const draggingClass = isDragging ? 'opacity-50' : '';

    // Concatenación de clases
    const classes = `${baseClasses} ${draggingClass}`.trim();
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}
            className={classes}>
            <p className='text-white'>{title}</p>
            <div className='absolute bottom-0 pb-1'>
                <p className='text-white'>{id}</p>
            </div>
        </div>
    );
};

export default BoardCard;
