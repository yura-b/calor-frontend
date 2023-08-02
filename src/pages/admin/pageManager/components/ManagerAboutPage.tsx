import React from 'react';
import Events from '@pages/admin/pageManager/components/about/Events.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { removeDuplicateTitle } from '@/helpers/functions/removeDuplicateTitle.ts';
import { saveChanges } from '@/api/manager/pages.ts';
import { toggleEditing } from '@/store/admin/PageManagerReducer.ts';
import SectionBlock from '@pages/admin/pageManager/components/SectionBlock.tsx';

const ManagerAboutPage = () => {
  const { pageSections, isDisable } = useAppSelector(state => state.pageManager);
  const { access_token } = useAppSelector(state => state.user);


  const dispatch = useAppDispatch();
  
  const whoWeAre = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Who We Are'));
  const ourStory = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Our Story'));
  const manufacture = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Our Manufacture'));

  const submitHandler = () => {
    if (access_token) saveChanges(access_token, pageSections)
      .then(() => {
        dispatch(toggleEditing(true));
      });
  };

  return (
    <div className={'flex flex-col gap-12 p-12'}>
      <SectionBlock arr={whoWeAre} title={'Who We Are'} />
      <SectionBlock arr={ourStory} title={'Our Story'} />
      <SectionBlock arr={manufacture} title={'Our Manufacture'} />
      <Events/>
    </div>
  );
};

export default ManagerAboutPage;