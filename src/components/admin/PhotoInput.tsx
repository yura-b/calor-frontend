import React, { FC } from 'react';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

const PhotoInput: FC<{ handler: (e: File) => void }> = ({ handler }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    
    handler(e.target.files[0]);
  };
  
  return (
    <label className={'flex flex-col bg-custom-grey items-center w-full'}>
      <p className={'font-bold py-8'}>Upload photo</p>
      <input name='file' type={InputType.file} accept="image/png, image/gif, image/jpeg"
             style={{ display: 'none', width: '100%', height: '100%' }}
             onChange={handleChange}
      />
    </label>
  );
};

export default PhotoInput;