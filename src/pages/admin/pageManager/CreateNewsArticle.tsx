import React, { useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { uploadPhoto } from '@/api/do';
import { createNewsArticle } from '@/api/manager/newsArticle';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';

const CreateNewsArticle = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [photo, setPhoto] = useState<File>();
  const [title, setTitle] = useState<string>();
  const [article, setArticle] = useState<string>();

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const announcementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle(e.target.value);
  };

  const handleAddNewNewsArticle = () => {
    if (!(title && article && access_token)) return;
    uploadPhoto(photo, 'events').then((res) => {
      createNewsArticle(
        {
          photo: res.data.url,
          title,
          newsArticle: article,
        },
        access_token
      ).then(() => {
        dispatch(showMessage('New article was successfully added'));
      });
    });
  };

  return (
    <AdminLayout>
      <UserPageHeader
        buttonAvailable={false}
        url={'/admin/manager'}
        upperText={'Back to Page Manager'}
        bottomText={'New Article'}
      />
      <div className={'m-24'}>
        <div className={'flex flex-row mb-8 items-center gap-3'}>
          <PlusCircle size={32} fill={'weight'} />
          <p>New Article</p>
        </div>
        <div className={'flex flex-row gap-12'}>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>1. Add a photo</p>
            <span>maximum 1 photo</span>
            <PhotoInput handler={setPhoto} />
            <p className={'text-blue-500'}>{photo?.name}</p>
          </div>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>2. Article's Detail</p>
            <CustomInput description={'Title'} value={title} onChange={titleHandler} />
            <CustomInput description={'New Article description'} value={article} onChange={announcementHandler} />
            <CustomButton title={'Add New Article'} handler={handleAddNewNewsArticle} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateNewsArticle;
