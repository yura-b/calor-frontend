import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';

const CreateEvent = () => {
  const [photo, setPhoto] = useState<File>()


  return (
    <AdminLayout>


      <div>
        <div className={'flex flex-row '}>
          <PlusCircle size={32} fill={'weight'} />
          <p>New Event</p>
        </div>
        <div className={'flex flex-row'}>
          <div className={'flex flex-col gap-5'}>
            <p className={'font-bold'}>1. Add a photo</p>
            <p>maximum 1 photo</p>
            <PhotoInput handler={setPhoto}/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateEvent;