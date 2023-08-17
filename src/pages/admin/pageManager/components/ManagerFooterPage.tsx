import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { removeDuplicateTitle } from '@/helpers/functions/removeDuplicateTitle.ts';
import SectionBlock from '@pages/admin/pageManager/components/SectionBlock.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { saveChanges } from '@/api/manager/pages.ts';
import { toggleEditing } from '@/store/admin/PageManagerReducer.ts';

const ManagerFooterPage = () => {
  const { pageSections, isDisable } = useAppSelector(state => state.pageManager);
  const { access_token } = useAppSelector(state => state.user);
  
  const dispatch = useAppDispatch();

  const submitHandler = () => {
    if (access_token) saveChanges(access_token, pageSections)
      .then(() => {
        dispatch(toggleEditing(true));
      });
  };

  const address = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Address'));
  const phoneNumber = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Phone Number'));
  const Email = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Email'));

  return (
    <div className={'flex flex-col gap-12 p-12'}>
    <SectionBlock arr={phoneNumber} title={'Phone Number'} />
      <SectionBlock arr={address} title={'Address'} />
      <SectionBlock arr={Email} title={'Email'} />
      {!isDisable && <div className={'flex justify-end'}>
        <CustomButton title={'Submit'} handler={submitHandler} />
      </div>}
    </div>
  );
};

export default ManagerFooterPage;