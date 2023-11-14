import React, { useEffect, useState } from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';
import NewsArticlesGrid from '@/pages/admin/pageManager/components/about/InThePress/NewsArticlesGrid';
import { Events } from '@/constants/interfaces/events.ts';
import { getEvents } from '@/api/manager/event.ts';

const EventsBlock = () => {
  const navigate = useNavigate();
  const [newsArticles, setNewsArticles] = useState<Events[]>();

  useEffect(() => {
    getEvents().then((res) => {
        setNewsArticles(res.data);
    });
  }, []);

  if (!newsArticles) return;
  const buttonHandler = () => {
    navigate('/admin/createevent');
  };
  return (
    <div className={'flex flex-col gap-12'}>
      <div className={'flex flex-row justify-between'}>
        <h1 className={'text-xl font-bold'}>News Articles</h1>
        <CustomButton styles={'!px-12'} title={'+  Add New'} handler={buttonHandler} />
      </div>
      <NewsArticlesGrid newsArticles={newsArticles} />
    </div>
  );
};

export default EventsBlock;
