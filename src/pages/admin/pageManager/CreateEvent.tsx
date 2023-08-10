import React, { useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { uploadEventPhoto } from '@/api/manager/pages.ts';
import { createEvent } from '@/api/manager/event.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';

const CreateEvent = () => {

  const {access_token} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()


  const [photo, setPhoto] = useState<File>();
  const [title, setTitle] = useState<string>()
  const [announcement, setAnnouncement] = useState<string>()

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
   const announcementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement(e.target.value)
  }


  const handleAddNewEvent = () => {
    if (!(title && announcement && access_token)) return
    uploadEventPhoto(photo).then(res=>{
        createEvent({
          photo: res.data.url ,
          title,
          announcement
        }, access_token)
          .then(() =>{
            dispatch(showMessage('New event was successfully added'))
          })
    });
  }

  return (
    <AdminLayout>
      <UserPageHeader buttonAvailable={false} url={'/admin/manager'} upperText={'Back to Page Manager'} bottomText={'New EventComponent'}/>
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
            <CustomInput description={'Title'} value={title} onChange={titleHandler}/>
            <CustomInput description={'News Announcement'} value={announcement} onChange={announcementHandler}/>
            <CustomButton title={'Add New EventComponent'} handler={handleAddNewEvent}/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateEvent;
