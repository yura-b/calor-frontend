import React, { useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { uploadEventPhoto } from '@/api/manager/pages.ts';
import { errorCorrupted, loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import { createProduct } from '@/api/products.ts';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ItemForm, { productForm } from '@pages/admin/catalog/components/ItemForm.tsx';
import InputForPhotos from './components/InputForPhotos';

const CreateItem = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [photos, setPhotos] = useState<File[]>([]);

  const handleAddNewItem = (values: productForm) => {
    if (!access_token) return;
    dispatch(loading());
    Promise.all(
      photos.map(async (photo) => {
        if (!photo) return;
        return await uploadEventPhoto(photo);
      })
    )
      .then((responses) => {
        // Check if responses is an array and has length

        if (Array.isArray(responses) && responses.length > 0) {
          const data = responses.map((response) => response?.data); // Access the data property for each response
          const photos = data.map((el) => el.url);

          createProduct(
            {
              ...values,
              photos: photos
            },
            access_token
          )
            .then(() => {
              dispatch(loadingFinished());
              dispatch(showMessage('New item was successfully added'));
            })
            .catch(() => {
              loadingFinished();
            });
        }
      })
      .catch((e) => {
        dispatch(loadingFinished);
        dispatch(errorCorrupted(e.response.data.message));
      });
  };


  return (
    <AdminLayout>
      <UserPageHeader
        buttonAvailable={false}
        url={'/admin/catalog'}
        upperText={'Back to catalog'}
        bottomText={'New Item'}
      />
      <div className={'m-24'}>
        <div className={'flex flex-row mb-8 items-center gap-3'}>
          <PlusCircle size={32} fill={'weight'} />
          <p>New Product</p>
        </div>
        <div className={'flex flex-row gap-12'}>
          <InputForPhotos getPhotos={setPhotos} />
          <ItemForm onSubmitHandler={handleAddNewItem} buttonTitle={'Create Item'} isShoes={false} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateItem;
