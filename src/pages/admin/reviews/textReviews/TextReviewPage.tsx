import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import TextReviewsGrid from '@pages/admin/reviews/textReviews/components/TextReviewsGrid.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';

const TextReviewPage = () => {
  return (
    <AdminLayout>
      <GridHeader title={'Text Reviews'} />
      <TextReviewsGrid />
    </AdminLayout>
  );
};

export default TextReviewPage;
