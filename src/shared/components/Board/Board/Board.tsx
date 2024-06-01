import * as React from 'react';
import BoardColumn, { IBoardColumnProps } from '../BoardColumn/BoardColumn';
import { v4 as uuidv4 } from 'uuid';

import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import BoardCard from '../BoardCard/BoardCard';
import Modal from '../../Modals/Modal';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

interface IBoardProps {
    columns: IBoardColumnProps[]
}

type DNDType = {
    id: UniqueIdentifier;
    title: string;
    items: {
        id: UniqueIdentifier;
        title: string;
    }[];
};

const Board: React.FunctionComponent<IBoardProps> = () => {
    const [containers, setContainers] = React.useState<DNDType[]>([
        {
            id: 'container-1',
            title: 'To Do',
            items: [
                { id: 'item-1', title: 'Task 1' },
                { id: 'item-2', title: 'Task 2' },
            ],
        },
        {
            id: 'container-2',
            title: 'In Progress',
            items: [
                { id: 'item-3', title: 'Task 3' },
                { id: 'item-4', title: 'Task 4' },
            ],
        },
        {
            id: 'container-3',
            title: 'Done',
            items: [
                { id: 'item-5', title: 'Task 5' },
                { id: 'item-6', title: 'Task 6' },
            ],
        },
    ]);
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
    const [currentContainerId, setCurrentContainerId] = React.useState<UniqueIdentifier>();
    const [containerName, setContainerName] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [showAddContainerModal, setShowAddContainerModal] = React.useState(false);
    const [showAddItemModal, setShowAddItemModal] = React.useState(false);

    const onAddContainer = () => {
        if (!containerName) return;
        const id = `container-${uuidv4()}`;
        setContainers([
            ...containers,
            {
                id,
                title: containerName,
                items: [],
            },
        ]);
        setContainerName('');
        setShowAddContainerModal(false);
    };

    const onAddItem = () => {
        if (!itemName) return;
        const id = `item-${uuidv4()}`;
        const container = containers.find((item) => item.id === currentContainerId);
        if (!container) return;
        container.items.push({
            id,
            title: itemName,
        });
        setContainers([...containers]);
        setItemName('');
        setShowAddItemModal(false);
    };

    function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
        if (type === 'container') {
            return containers.find((item) => item.id === id);
        }
        if (type === 'item') {
            return containers.find((container) =>
                container.items.find((item) => item.id === id),
            );
        }
    }

    const findItemTitle = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'item');
        if (!container) return '';
        const item = container.items.find((item) => item.id === id);
        if (!item) return '';
        return item.title;
    };

    const findContainerTitle = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return '';
        return container.title;
    };

    const findContainerItems = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return [];
        return container.items;
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        setActiveId(id);
    }
    const handleDragMove = (event: DragMoveEvent) => {
        const { active, over } = event;

        // Handle Items Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active container and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );
            const overitemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id,
            );
            // In the same container
            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeitemIndex,
                    overitemIndex,
                );

                setContainers(newItems);
            } else {
                // In different containers
                let newItems = [...containers];
                const [removeditem] = newItems[activeContainerIndex].items.splice(
                    activeitemIndex,
                    1,
                );
                newItems[overContainerIndex].items.splice(
                    overitemIndex,
                    0,
                    removeditem,
                );
                setContainers(newItems);
            }
        }

        // Handling Item Drop Into a Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );

            // Remove the active item from the active container and add it to the over container
            let newItems = [...containers];
            const [removeditem] = newItems[activeContainerIndex].items.splice(
                activeitemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removeditem);
            setContainers(newItems);
        }
    };
    // This is the function that handles the sorting of the containers and items when the user is done dragging.
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        // Handling Container Sorting
        if (
            active.id.toString().includes('container') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === active.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === over.id,
            );
            // Swap the active and over container
            let newItems = [...containers];
            newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
            setContainers(newItems);
        }

        // Handling item Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );
            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );
            const overitemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id,
            );

            // In the same container
            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeitemIndex,
                    overitemIndex,
                );
                setContainers(newItems);
            } else {
                // In different containers
                let newItems = [...containers];
                const [removeditem] = newItems[activeContainerIndex].items.splice(
                    activeitemIndex,
                    1,
                );
                newItems[overContainerIndex].items.splice(
                    overitemIndex,
                    0,
                    removeditem,
                );
                setContainers(newItems);
            }
        }
        // Handling item dropping into Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );
            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );

            let newItems = [...containers];
            const [removeditem] = newItems[activeContainerIndex].items.splice(
                activeitemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removeditem);
            setContainers(newItems);
        }
        setActiveId(null);
    }
    return (
        <>
            <Modal showModal={showAddItemModal}
                setShowModal={setShowAddItemModal}>
                <h1 className="text-gray-300 text-3xl font-bold">Add Task</h1>
                <Input
                    type="text"
                    placeholder="Item Title"
                    name="itemname"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <Button onClick={onAddItem} shadow={false}>
                    <p>Agregar Tarea</p>
                </Button>

            </Modal>
            <div className='w-full flex flex-row space-x-7 overflow-x-auto pb-2 h-[calc(100vh-175px)]'>
                <DndContext
                    modifiers={[]}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}>
                    <SortableContext items={containers.map((i) => i.id)}>
                        {containers.map((container) => (
                            <BoardColumn
                                id={container.id}
                                title={container.title}
                                key={container.id}
                                onAddItem={() => {
                                    setShowAddItemModal(true);
                                    setCurrentContainerId(container.id);
                                }}>
                                <SortableContext items={container.items.map((i) => i.id)}>
                                    <div className="flex items-start flex-col gap-y-4">
                                        {container.items.map((i) => (
                                            <BoardCard title={i.title} id={i.id} key={i.id} />
                                        ))}
                                    </div>
                                </SortableContext>
                            </BoardColumn>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </>
    );
};

export default Board;
