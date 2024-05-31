import * as React from 'react';
import { IBoardCardProps } from '../BoardCard/BoardCard';
import { UniqueIdentifier } from '@dnd-kit/core';
import ContainerProps from '../../../DndKit/Container/container.type';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { FiMoreVertical } from 'react-icons/fi';
import Button from '../../Button/Button';
import DropdownButton from '../../Button/DropDownButton';


export interface IBoardColumnProps {
    key: UniqueIdentifier;
    name: string
    cards: IBoardCardProps[]
}

const BoardColumn: React.FunctionComponent<ContainerProps> = ({
    id,
    children,
    title,
    description,
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
    const baseClasses = 'min-w-60 bg-background-light rounded-md flex flex-col h-full py-2 shadow-2xl';
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
            <div className='sticky top-0 py-3 px-5 text-gray-300 bg-background-light rounded-md '>
                <div className='flex w-full flex-row justify-between items-center'>
                    {title}
                    <DropdownButton buttonLabel={<FiMoreVertical />} color="light">
                        <div className='flex flex-col'>
                            <Button
                                type='simple'
                                shadow={false}
                                outlined={false}
                                onClick={()=>{onAddItem!()}}>
                                Agregar
                            </Button>
                        </div>

                    </DropdownButton>
                </div>
            </div>
            <div className='px-2 space-y-5 flex flex-col'>
                <div {...listeners}>
                    {children}
                </div>
            </div>

        </div>
    );
};

export default BoardColumn;
