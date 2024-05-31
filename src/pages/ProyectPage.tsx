import React, { useCallback, useRef, useState } from 'react';
import Logo from '../assets/logo.png';
import SlideNavBarGroupItems from '../shared/components/SlideNavBar/NavBarGroupItems/SlideNavBarGroupItems';
import { SlideNavBarItemProps } from '../shared/components/SlideNavBar/NavBarItem/SlideNavBarItem';
import SliderNavBarDivider from '../shared/components/SlideNavBar/Divider/SliderNavBarDivider';
import SlideNavBarHeader from '../shared/components/SlideNavBar/Header/SlideNavBarHeader';
import Board from '../shared/components/Board/Board/Board';
import { IBoardColumnProps } from '../shared/components/Board/BoardColumn/BoardColumn';
import { IBoardCardProps } from '../shared/components/Board/BoardCard/BoardCard';


const planeacion: SlideNavBarItemProps[] = [
    { itemName: 'Cronograma', onClick: () => console.log('Cronograma clicked') },
    { itemName: 'Backlog', onClick: () => console.log('Tareas clicked') },
    { itemName: 'Tablero', onClick: () => console.log('Tareas clicked') },
    { itemName: 'Calendario', onClick: () => console.log('Tareas clicked') },
    { itemName: 'Listas', onClick: () => console.log('Tareas clicked') },
    { itemName: 'Incidencias', onClick: () => console.log('Tareas clicked') },
]
const porHacer: IBoardCardProps[] = [
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
]

const columnas: IBoardColumnProps[] = [
    { name: 'Por Hacer', cards: porHacer, key: '1' },
    { name: 'Desarrollo', cards: [], key: '2' },
    { name: 'Testing', cards: [], key: '3' },
    { name: 'Terminado', cards: [], key: '4' },
]


const ProyectPage: React.FC = () => {
    const [x, setX] = useState(250);

    const handleMouseMove = (e: MouseEvent) => {
        setX(x => x + e.movementX > 500 ? 500 : x + e.movementX < 250 ? 250 : x + e.movementX);
    };

    const mauUp = useCallback(() => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", mauAbj);
    }, []);

    const mauAbj = useCallback(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", mauUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", mauUp);
        }
    }, []);

    return (
        <div className='bg-background-dark p-0 h-[100vh] flex flex-row'>
            <div style={{ width: x, minWidth: 250 }} className='py-10 px-2 flex flex-col'>
                {/** Header */}
                <SlideNavBarHeader logo={Logo} proyectName={'Jira Apl'} />
                {/** Group Items */}
                <SlideNavBarGroupItems nameGroup={"Planeacion"} items={planeacion} />
                <SliderNavBarDivider />

            </div>
            <div
                className={`hover:cursor-col-resize py-10 px-2 w-5 flex border-l-2 border-background-light select-none`}
                onMouseDown={mauAbj}
            ></div>
            <div className='w-full flex overflow-x-hidden'>
                <div className='pt-0 h-full w-full'>
                    <div className='h-[175px] py-5'>
                        <h3 className='text-gray-200 font-semibold text-3xl'>Tablero Sprint</h3>
                    </div>
                    {/**Board */}
                    <Board columns={[]} />
                </div>
            </div>
        </div>
    );
};

export default ProyectPage;
