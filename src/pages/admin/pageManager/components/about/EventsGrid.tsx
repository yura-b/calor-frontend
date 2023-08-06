import React, { FC } from 'react';
import { Events } from '@/constants/interfaces/events.ts';
import EventComponent from '@pages/admin/pageManager/components/about/EventComponent.tsx';

const EventsGrid: FC<{ events: Events[] }> = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return <EventComponent key={event._id} {...event} />;
      })}
    </div>
  );
};

export default EventsGrid;
