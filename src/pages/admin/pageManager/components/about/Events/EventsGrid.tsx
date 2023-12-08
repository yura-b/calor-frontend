import React, { FC } from 'react';
import { Events } from '@/constants/interfaces/events.ts';
import EventComponent from '@/pages/admin/pageManager/components/about/Events/EventComponent';

const EventsGrid: FC<{ events: Events[] }> = ({ events }) => {
  const sortedEventsByDate = events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  return (
    <div className={'flex flex-row flex-wrap gap-8'}>
      {sortedEventsByDate.map((event) => {
        return <EventComponent key={event._id} {...event} />;
      })}
    </div>
  );
};

export default EventsGrid;
