import * as React from 'react';
import BoardCard, { IBoardCardProps } from '../BoardCard/BoardCard';

export interface IBoardColumnProps {
    key:number;
    name:string
    cards: IBoardCardProps[]
}

const BoardColumn: React.FunctionComponent<IBoardColumnProps> = ({name, cards}) => {
    return (
        <div className='min-w-60 bg-background-light rounded-md flex flex-col h-full py-2 shadow-2xl'>
            <div className='sticky top-0 py-3 pl-5 text-gray-300 bg-background-light rounded-md '>
                {name}
            </div>
            <div className='px-2 space-y-5 flex flex-col'>
                {cards.map((card, index) => {
                    console.log(card,)
                    return <BoardCard key={index} />
                })}
            </div>
        </div>
    );
};

export default BoardColumn;
