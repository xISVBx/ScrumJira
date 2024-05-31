import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


// @ts-ignore
export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      type: 'type1',
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };


  return (
    <div>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button>
    </div>
  );
}