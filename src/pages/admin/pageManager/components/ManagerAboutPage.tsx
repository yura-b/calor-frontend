import React from 'react';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { removeDuplicateTitle } from '@/helpers/functions/removeDuplicateTitle.ts';
import SectionBlock from '@pages/admin/pageManager/components/SectionBlock.tsx';
import EventsBlock from '@pages/admin/pageManager/components/about/EventsBlock.tsx';

const ManagerAboutPage = () => {
  const { pageSections } = useAppSelector((state) => state.pageManager);

  const whoWeAre = removeDuplicateTitle(pageSections.filter((sections) => sections.section === 'Who We Are'));
  const ourStory = removeDuplicateTitle(pageSections.filter((sections) => sections.section === 'Our Story'));
  const manufacture = removeDuplicateTitle(pageSections.filter((sections) => sections.section === 'Our Manufacture'));

  return (
    <div className={'flex flex-col gap-12 p-12'}>
      <SectionBlock arr={whoWeAre} title={'Who We Are'} />
      <SectionBlock arr={ourStory} title={'Our Story'} />
      <SectionBlock arr={manufacture} title={'Our Manufacture'} />
      <EventsBlock />
    </div>
  );
};

export default ManagerAboutPage;
