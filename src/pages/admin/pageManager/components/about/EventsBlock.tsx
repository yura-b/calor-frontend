import React, { useEffect, useState } from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';
import EventsGrid from '@pages/admin/pageManager/components/about/EventsGrid.tsx';
import { Events } from '@/constants/interfaces/events.ts';
import { getEvents } from '@/api/manager/event.ts';

const EventsBlock = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Events[]>();

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res.data);
    });
  }, []);
  console.log(events);
  if (!events) return;
  const buttonHandler = () => {
    navigate('/admin/createevent');
  };
  return (
    <div className={'flex flex-col gap-12'}>
      <div className={'flex flex-row justify-between'}>
        <h1 className={'text-xl font-bold'}>Events</h1>
        <CustomButton title={'+  Add New'} handler={buttonHandler} />
      </div>
      <EventsGrid events={events} />
    </div>
  );
};

export default EventsBlock;
