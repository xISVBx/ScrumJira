import * as React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { FiMoreVertical } from 'react-icons/fi';
import Button from '../../Button/Button';
import DropdownButton from '../../Button/DropDownButton';


export interface IBoardColumn {
    id: UniqueIdentifier;
    title: string
    items: {
        id: UniqueIdentifier;
        title: string;
    }[]
}
export interface IBoardColumnProps extends Omit<IBoardColumn, 'items'> {
    children: React.ReactNode
    onAddItem: () => void;
}

const BoardColumn: React.FunctionComponent<IBoardColumnProps> = ({
    id,
    children,
    title,
    onAddItem, }) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'container',
        },
    });
    const baseClasses = 'min-w-60 bg-background-light rounded-md flex flex-col h-full py-2 shadow-2xl ';
    const draggingClass = isDragging ? 'opacity-50' : '';
    const containerClasses = `${baseClasses} ${draggingClass}`.trim();
    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}
            className={containerClasses}>
            <div className='sticky top-0 h-[80px] text-gray-300 bg-background-light rounded-md '>
                <div className='flex w-full flex-row justify-between items-center py-3 px-5'>
                    <div className='w-full' {...listeners}>
                        {title}
                    </div>
                    <DropdownButton buttonLabel={<FiMoreVertical />} color="light">
                        <div className='flex flex-col relative' >
                            <Button
                                type='simple'
                                shadow={false}
                                outlined={false}
                                onClick={() => { onAddItem() }}>
                                Agregar
                            </Button>
                        </div>

                    </DropdownButton>
                </div>
            </div>
            <div className='px-2 space-y-5 flex flex-col min-h-[calc(100vh-185px-80px)] ' {...listeners}>
                <div>
                    {children}
                </div>
            </div>

        </div>
    );
};

export default BoardColumn;
