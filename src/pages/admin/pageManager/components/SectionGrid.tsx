import React from 'react';
import { PageSection } from '@/constants/interfaces/pageSection.ts';


interface IProps {
  page: pageState,
  editable: boolean
}

interface pageState {
  state: PageSection[];
  setState: React.Dispatch<React.SetStateAction<PageSection[]>>;
}
const SectionGrid:React.FC<IProps>= ({page, editable}) => {
  const { state,setState} = page
  return (
    <div>
      {editable}
    </div>
  );
};

export default SectionGrid;