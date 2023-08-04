import React, {FC} from 'react';
import {Events} from '@/constants/interfaces/events.ts';

const EventComponent:FC<Events> = ({photo, title,announcement}) => {
    return (
        <div className={'flex flex-col items-center w-1/6'}>
            <img src={photo} alt=""/>
            <p className='font-bold'>{title}</p>
            <p>{announcement}</p>
        </div>
    );
};

export default EventComponent;
