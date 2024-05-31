import React from 'react';
import ContainerProps from './container.type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../Button';

const Container = ({
  id,
  children,
  title,
  description,
  onAddItem,
}: ContainerProps) => {
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

  // Clases base para el contenedor
  const baseClasses = 'min-w-60 bg-background-light rounded-md flex flex-col h-full py-2 shadow-2xl';
  
  // Si está siendo arrastrado, añadir clase de opacidad
  const draggingClass = isDragging ? 'opacity-50' : '';
  
  // Concatenación de clases
  const containerClasses = `${baseClasses} ${draggingClass}`.trim();

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={containerClasses}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-gray-800 text-xl">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <button
          className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
          {...listeners}
        >
          Drag Handle
        </button>
      </div>

      {children}
      <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button>
    </div>
  );
};

export default Container;
