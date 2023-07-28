import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import { getPageSection } from '@/api/pages.ts';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import SectionGrid from '@pages/admin/pageManager/components/SectionGrid.tsx';
import {useAppDispatch} from '@/store/hooks/hooks.ts';
import {setPages} from '@/store/admin/PageManagerReducer.ts';

const PageManagerPage = () => {

  const dispatch = useAppDispatch()


  useEffect(()=>{
    getPageSection().then(res=>{
      dispatch(setPages(res.data))
    })
  }, [])


  return (
    <AdminLayout>
      <GridHeader title={'Page Manager'} buttonTitle={'edit'} />
      <SectionGrid/>
    </AdminLayout>
  );
};

export default PageManagerPage;
