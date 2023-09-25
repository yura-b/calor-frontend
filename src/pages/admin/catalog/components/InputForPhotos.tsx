import React, { FC, useEffect, useState } from 'react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import { X } from '@phosphor-icons/react';

interface IProps {
  getPhotos: React.Dispatch<React.SetStateAction<File[]>>,
  clearPhotos?: number
}
const InputForPhotos:FC<IProps> = ({getPhotos, clearPhotos}) => {

  const [photos, setPhotos] = useState<File[]>([]);


  useEffect(() => {
    setPhotos([])
  }, [clearPhotos]);
  const photoHandler = (photo: File) => {
    if (photos.includes(photo) || photos.length === 5) return;
    setPhotos((prevState) => [...prevState, photo]);
  };
  const deletePhoto = (name: string) => {
    return () => {
      setPhotos((prevState) => prevState.filter((photo) => photo.name !== name));
      };
  };
  useEffect(() => {
    getPhotos(photos)
  }, [photos]);

  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <p className={'font-bold'}>1. Add a photo</p>
      <span>maximum 5 photo</span>
      <PhotoInput handler={photoHandler} />
      {photos?.map((photo) => {
        return (
          <div key={photo.name} className={'flex flex-row justify-between align-baseline'}>
            <p className={'text-mint font-medium'}>{photo.name}</p>
            <X weight={'fill'} className={'cursor-pointer'} size={20} onClick={deletePhoto(photo.name)} />
          </div>
        );
      })}
    </div>
  );
};

export default InputForPhotos;