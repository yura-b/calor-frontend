import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import { getPageSection } from '@/api/manager/pages.ts';
import ManagerHomerPage from '@pages/admin/pageManager/components/ManagerHomerPage.tsx';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { setPages, toggleEditing } from '@/store/admin/PageManagerReducer.ts';
import Navigation from '@components/admin/Navigation.tsx';
import ManagerAboutPage from '@pages/admin/pageManager/components/ManagerAboutPage.tsx';
import ManagerFooterPage from '@pages/admin/pageManager/components/ManagerFooterPage.tsx';

enum pages {
  HomePage = 'Home Page',
  About = 'About',
  Help = 'Help',
  CustomerExperience = 'Customer Experience',
  Footer = 'Footer',
}

const pagesArr: pages[] = [pages.HomePage, pages.About, pages.Help, pages.CustomerExperience, pages.Footer];

const PageManagerPage = () => {
  const [page, setPage] = useState<string>(pages.HomePage);

  const dispatch = useAppDispatch();

  const headerClickHandler = () => {
    dispatch(toggleEditing(false));
  };
  useEffect(() => {
    getPageSection().then((res) => {
      dispatch(setPages(res.data));
    });
  }, []);

  return (
    <AdminLayout>
      <GridHeader title={'Page Manager'} buttonTitle={'edit'} click={headerClickHandler} />
      <div className={'ml-12 mt-8'}>
        <Navigation setState={setPage} state={page} array={pagesArr} />
      </div>
      {page === pages.HomePage && <ManagerHomerPage />}
      {page === pages.About && <ManagerAboutPage/>}
      {page === pages.Footer && <ManagerFooterPage/>}

    </AdminLayout>
  );
};

export default PageManagerPage;
