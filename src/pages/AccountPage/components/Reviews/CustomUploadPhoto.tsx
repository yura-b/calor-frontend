import React, { FC, useState } from 'react';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { FileImage, X } from '@phosphor-icons/react';

const CustomUploadPhoto: FC<{ handler: (e: File) => void }> = ({ handler }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setPhoto(file.name);
    handler(file);
  };

  return (
    <div>
      <div>
        {Boolean(photo) && typeof photo === 'string' && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex justify-center items-center">
              <FileImage size={25} />
              <span className="text-xs text-[#217AFF] "> {photo}</span>
            </div>
            <X size={25} onClick={() => setPhoto(null)} />
          </div>
        )}
      </div>
      <label
        className={
          'flex flex-col cursor-pointer hover:bg-grayExtraLight bg-white border-2 border-[#1EC1AA] items-center w-full'
        }
      >
        <p className={'font-bold text-mint py-2'}>Upload photo</p>
        <input
          name="file"
          type={InputType.file}
          accept="image/png, image/gif, image/jpeg"
          style={{ display: 'none', width: '100%', height: '100%' }}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default CustomUploadPhoto;
