import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { uploadEventPhoto } from '@/api/manager/pages.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import { PlusCircle } from '@phosphor-icons/react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { ProductCategories } from '@/constants/interfaces/productCategories.ts';
import { getCategories } from '@/api/products.ts';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import { SelectChangeEvent } from '@mui/material/Select';

const CreateItem = () => {
  const { access_token } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<ProductCategories[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');


  const [photos, setPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState<string>();
  const [announcement, setAnnouncement] = useState<string>();

  useEffect(() => {
    dispatch(loading());
    getCategories().then(res => {
      setCategories(res.data);
    });

    dispatch(loadingFinished());
  }, []);


  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
    };
  };


  const photoHandler = (photo: File) => {
    if (photos.includes(photo) || photos.length === 5) return;
    console.log(photo);
    setPhotos(prevState => [...prevState, photo]);
  };

  const handleAddNewItem = () => {
    if (!(title && announcement && access_token)) return;
    Promise.all(photos.map(async (photo) => {
      if (!photo) return;
      return await uploadEventPhoto(photo);
    })).then(res => {
      console.log(res);
    });
  };
  if (!categories) return;

  const subcategories = categories.find(el => el.categoryTitle === selectedCategory)?.subCategory || [''];

  return (
    <AdminLayout>
      <UserPageHeader buttonAvailable={false} url={'/admin/manager'} upperText={'Back to Page Manager'}
                      bottomText={'New EventComponent'} />
      <div className={'m-24'}>
        <div className={'flex flex-row mb-8 items-center gap-3'}>
          <PlusCircle size={32} fill={'weight'} />
          <p>New Product</p>
        </div>
        <div className={'flex flex-row gap-12'}>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>1. Add a photo</p>
            <span>maximum 5 photo</span>
            <PhotoInput handler={photoHandler} />
            {photos?.map(photo => {
              return <p key={photo.name} className={'text-mint font-medium'}>{photo.name}</p>;
            })}
          </div>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>2. Event`s Detail</p>
            <CustomSelect value={selectedCategory} array={categories.map(el => el.categoryTitle)} defaultValue={''}
                          handleFunc={changeHandler(setSelectedCategory)} />
            <CustomSelect value={selectedSubCategory} array={subcategories} defaultValue={''}
                          handleFunc={changeHandler(setSelectedSubCategory)} />
            {/* <CustomInput description={'News Announcement'} value={announcement} onChange={announcementHandler} />*/}
            <CustomButton title={'Add New EventComponent'} handler={handleAddNewItem} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateItem;