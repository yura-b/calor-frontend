import React from 'react';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import { PageEnum } from '@/constants/enums/pages.enum.ts';
import Section from '@pages/admin/pageManager/components/home/Section.tsx';

 const SectionBlock: React.FC<{
  arr: (PageSection | { title: null, page: PageEnum, value: string, _id: string, section: string })[],
  title: string
}> = ({arr, title}) => {

  return <div>
    <h1 className={'font-bold'}>{title}</h1>
    <div className={'flex flex-wrap gap-10'}>
      {
        arr.map((section) => {
          return <Section key={section._id} {...section} id={section._id}/>
        })}
    </div>
  </div>
}
export default SectionBlock