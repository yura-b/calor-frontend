import React, { useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { uploadEventPhoto } from '@/api/pages.ts';

const CreateEvent = () => {
  const [photo, setPhoto] = useState<File>();

  const handleAddNewEvent = () => {
    uploadEventPhoto(photo);
  }

  return (
    <AdminLayout>
      <UserPageHeader buttonAvailable={false} url={'/admin/manager'} upperText={'Back to Page Manager'} bottomText={'New Event'}/>
      <div className={'m-24'}>
        <div className={'flex flex-row mb-8 items-center gap-3'}>
          <PlusCircle size={32} fill={'weight'} />
          <p>New Event</p>
        </div>
        <div className={'flex flex-row gap-12'}>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>1. Add a photo</p>
            <span>maximum 1 photo</span>
            <PhotoInput handler={setPhoto} />
            <p className={'text-blue-500'}>{photo?.name}</p>
          </div>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>2. Event`s Detail</p>
            <CustomInput description={'Title'} />
            <CustomInput description={'News Announcement'} />
            <CustomButton title={'Add New Event'} handler={handleAddNewEvent}/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateEvent;