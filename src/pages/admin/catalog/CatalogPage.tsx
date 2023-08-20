import React from 'react';
import GridHeader from '@components/admin/GridHeader.tsx';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';

const CatalogPage = () => {
  const navigate = useNavigate();
  const headerClickHandler = () => {
    navigate('/admin/createitem');
  };
  return (
    <AdminLayout>
      <GridHeader title={'Catalog'} click={headerClickHandler} buttonTitle={'+ create item'} />
    </AdminLayout>
  );
};

export default CatalogPage;
