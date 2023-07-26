import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import { getPageSection } from '@/api/pages.ts';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import SectionGrid from '@pages/admin/pageManager/components/SectionGrid.tsx';

const PageManagerPage = () => {
  
  const [pageSections, setPageSections] = useState<PageSection[]>([])
  const [isEditable, setIsEditable] = useState(false)
  useEffect(()=>{
    getPageSection().then(res=>{
      setPageSections(res.data)
    })
  }, [])

  console.log(pageSections);
  return (
    <AdminLayout>
      <GridHeader title={'Page Manager'} buttonTitle={'edit'} />
      <SectionGrid page={{state: pageSections, setState: setPageSections}} editable={isEditable}/>
    </AdminLayout>
  );
};

export default PageManagerPage;