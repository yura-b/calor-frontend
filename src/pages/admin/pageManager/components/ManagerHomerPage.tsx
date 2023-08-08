import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { removeDuplicateTitle } from '@/helpers/functions/removeDuplicateTitle.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { saveChanges } from '@/api/manager/pages.ts';
import { toggleEditing } from '@/store/admin/PageManagerReducer.ts';
import SectionBlock from '@pages/admin/pageManager/components/SectionBlock.tsx';

// interface IProps {
//   page: pageState,
//   editable: boolean
// }
//
// interface pageState {
//   state: PageSection[];
//   setState: React.Dispatch<React.SetStateAction<PageSection[]>>;
// }
const ManagerHomerPage = () => {
  const { pageSections, isDisable } = useAppSelector((state) => state.pageManager);
  const { access_token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const benefits = removeDuplicateTitle(pageSections.filter((sections) => sections.section === 'Benefits'));
  const PerfectFit = removeDuplicateTitle(pageSections.filter((sections) => sections.section === 'Perfect Fit'));
  const YourVision = removeDuplicateTitle(
    pageSections.filter((sections) => sections.section === 'Your Vision, Our Craftsmanship')
  );

  const submitHandler = () => {
    if (access_token)
      saveChanges(access_token, pageSections).then(() => {
        dispatch(toggleEditing(true));
      });
  };

  return (
    <div className={'flex flex-col gap-12 p-12'}>
      <SectionBlock arr={YourVision} title={'Your Vision, Our Craftsmanship'} />
      <SectionBlock arr={PerfectFit} title={'Perfect Fit'} />
      <SectionBlock arr={benefits} title={'Benefits'} />
      {!isDisable && (
        <div className={'flex justify-end'}>
          <CustomButton title={'Submit'} handler={submitHandler} />
        </div>
      )}
    </div>
  );
};

export default ManagerHomerPage;
