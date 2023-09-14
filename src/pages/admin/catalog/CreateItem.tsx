import React, { ChangeEvent, useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { uploadEventPhoto } from '@/api/manager/pages.ts';
import { loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import { PlusCircle, X } from '@phosphor-icons/react';
import PhotoInput from '@components/admin/PhotoInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { ProductCategories } from '@/constants/interfaces/productCategories.ts';
import { createProduct, getCategories } from '@/api/products.ts';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomTextField from '@components/admin/CustomTextField.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

const border = '1px #CBD2E0 solid';

const CreateItem = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<ProductCategories[]>();

  const [sizes, setSizes] = useState<{ index: number; size: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [productDetails, setProductDetails] = useState<string>('');

  useEffect(() => {
    dispatch(loading());
    getCategories().then((res) => {
      setCategories(res.data);
    });

    dispatch(loadingFinished());
  }, []);

  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
    };
  };

  const textAreaHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      setState(e.target.value);
    };
  };

  const sizeHandler = (
    setState: React.Dispatch<
      React.SetStateAction<
        {
          index: number;
          size: number;
        }[]
      >
    >,
    index: number
  ) => {
    return (e: SelectChangeEvent) => {
      setState((prevState) => {
        const record = prevState.find((el) => el.index === index);
        if (!record) return prevState;
        return prevState.map((el) => {
          if (el.index === record.index) return { index: record.index, size: Number(e.target.value) };
          return el;
        });
      });
    };
  };

  const addNewSize = () => {
    setSizes((prevState) => [...prevState, { index: prevState.length + 1, size: 0 }]);
  };
  const photoHandler = (photo: File) => {
    if (photos.includes(photo) || photos.length === 5) return;
    setPhotos((prevState) => [...prevState, photo]);
  };
  const deletePhoto = (name: string) => {
    return () => {
      setPhotos((prevState) => prevState.filter((photo) => photo.name !== name));
    };
  };

  const handleAddNewItem = () => {
    if (!access_token || !categories || !price || !productName) return;
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

          const category = categories?.find((el) => el.categoryTitle === selectedCategory)?._id || '';
          createProduct(
            {
              price: Number(price),
              category: category,
              subcategory: selectedSubCategory,
              photos: photos,
              size: sizes.map((size) => size.size),
              name: productName,
              description: description,
              productDetails: productDetails,
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
      .catch(() => {
        loadingFinished();
      });
  };
  if (!categories) return;

  const subcategories = categories.find((el) => el.categoryTitle === selectedCategory)?.subCategory || [''];
  const valueOfSubCategory = subcategories.includes(selectedSubCategory) ? selectedSubCategory : '';
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
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>1. Add a photo</p>
            <span>maximum 5 photo</span>
            <PhotoInput handler={photoHandler} />
            {photos?.map((photo) => {
              return (
                <div key={photo.name} className={'flex flex-row justify-between align-baseline'}>
                  <p className={'text-mint font-medium'}>{photo.name}</p>
                  <X weight={'fill'} size={20} onClick={deletePhoto(photo.name)} />
                </div>
              );
            })}
          </div>
          <div className={'flex flex-col gap-5 w-1/2'}>
            <p className={'font-bold'}>2. Item Detail</p>

            <CustomSelect
              value={selectedCategory}
              array={categories.map((el) => el.categoryTitle)}
              defaultValue={''}
              handleFunc={changeHandler(setSelectedCategory)}
            />

            <CustomSelect
              value={valueOfSubCategory}
              array={subcategories}
              defaultValue={''}
              handleFunc={changeHandler(setSelectedSubCategory)}
            />

            <CustomInput
              description={'Product name'}
              value={productName}
              onChange={changeHandler(setProductName)}
              border={border}
            />

            <p>Description</p>
            <CustomTextField
              defaultValue={description}
              setValue={textAreaHandler(setDescription)}
              disabledField={false}
            />
            <p>Product Details</p>
            <CustomTextField
              defaultValue={productDetails}
              setValue={textAreaHandler(setProductDetails)}
              disabledField={false}
            />

            <CustomInput
              type={InputType.number}
              description={'Price'}
              value={price}
              onChange={changeHandler(setPrice)}
              border={border}
            />

            <CustomInput
              type={InputType.number}
              description={'Amount'}
              value={amount}
              onChange={changeHandler(setAmount)}
              border={border}
            />

            <div className={'flex flex-row flex-wrap gap-6'}>
              {Array.from({ length: sizes.length }).map((_, index) => {
                const value = sizes.find((size) => size.index === index + 1)?.size.toString();
                return (
                  <div key={Math.random()} className={'w-1/5'}>
                    {' '}
                    <CustomInput
                      type={InputType.number}
                      value={value}
                      onChange={sizeHandler(setSizes, index + 1)}
                      border={border}
                    />
                  </div>
                );
              })}

              <CustomButton title={'Add size'} handler={addNewSize} styles={'w-1/6 !mx-[18px] !my-[15px]'} />
            </div>

            <CustomButton title={'Add New Item'} handler={handleAddNewItem} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateItem;
