import React, { useCallback, useRef, useState } from 'react';
import Logo from '../assets/logo.png';

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
            <div style={{ width: x }} className='py-10 px-5 flex flex-col'>
                {/** Header */}
                <div className='mb-5 flex flex-row'>
                    <img src={Logo} alt="" className='w-10' />
                    <div className='ml-2 '>
                        <h5 className='text-white text-sm'>Nombre Proyecto</h5>
                        <h6 className='text-xs text-gray-400'>Proyecto de Software</h6>
                    </div>
                </div>
                {/** Group Items */}
                <div className=''>
                    <button className=''>
                        <span className='text-white font-light'>Planeacion</span>
                    </button>
                </div>

            </div>
            <div
                className={`hover:cursor-col-resize py-10 px-2 w-5 flex border-l-2 border-red-500 select-none`}
                onMouseDown={mauAbj}
            ></div>
            <div className={`py-10 px-2 flex`}>
                <p>Contenido</p>
            </div>
        </div>
    );
};

export default ProyectPage;
