import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { removeDuplicateTitle } from '@/helpers/functions/removeDuplicateTitle.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { saveChanges } from '@/api/manager/pages.ts';
import { toggleEditing } from '@/store/admin/PageManagerReducer.ts';
import SectionBlock from '@pages/admin/pageManager/components/SectionBlock.tsx';
import rawEditorTextToHTML from '@/helpers/functions/rawEditorTextToHTML';

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
    if (access_token) {
      const updatedPageSections = pageSections.map((section) => {
        if (section.editorState) {
          return {
            ...section,
            value: rawEditorTextToHTML(section.editorState.getCurrentContent()),
          };
        }
        return section;
      });
      saveChanges(access_token, updatedPageSections).then(() => {
        dispatch(toggleEditing(true));
      });
    }
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
