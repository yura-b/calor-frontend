import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useParams } from 'react-router-dom';
import { editItem, getProductById } from '@/api/products.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { Product } from '@/constants/interfaces/product.ts';
import ItemForm, { productForm } from './components/ItemForm';
import InputForPhotos from './components/InputForPhotos';
import Slider from '@components/ui/Slider/Slider.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import { loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';
import { uploadPhoto } from '@/api/do';
import { IProperty } from '@/api/dto/products.dto.ts';

const EditItem = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [photos, getPhotos] = useState<File[]>([]);

  const [product, setProduct] = useState<Product>();
  const [_, refreshPage] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getProductById(id).then((res) => {
      setProduct(res.data);
    });
  }, [id, _]);
  if (!product) return;
  const isShoes = !(typeof product.category === 'object' && product.category !== null);
  const deletePhotoHandler = (url: string) => {
    if (!product) return;
    setProduct(() => {
      return {
        ...product,
        photos: product.photos.filter((currentUrl) => currentUrl !== url),
      };
    });
  };
  const submitHandler = (values: productForm) => {
    if (!access_token || !id) return;
    dispatch(loading());
    Promise.all(
      photos.map(async (photo) => {
        if (!photo) return;
        return await uploadPhoto(photo, 'products');
      })
    ).then((res) => {
      let photoRequest: IProperty = { shouldChange: true, propertyName: 'photos', propertyValue: product.photos };
      if (Array.isArray(res) && res.length > 0) {
        const data = res.map((response) => response?.data); // Access the data property for each response
        const photos = data.map((el) => el.url);

        photoRequest = {
          shouldChange: !isShoes,
          propertyValue: [...(product?.photos || ['']), ...photos],
          propertyName: 'photos',
        };
      }

      editItem(access_token, {
        id,
        values: {
          photoRequest,
          productDetails: {
            propertyValue: values.productDetails,
            propertyName: 'productDetails',
            shouldChange: true,
          },
          description: {
            propertyValue: values.description,
            propertyName: 'description',
            shouldChange: true,
          },
          title: {
            propertyValue: values.name,
            propertyName: 'title',
            shouldChange: !isShoes,
          },
          size: {
            shouldChange: true,
            propertyName: 'size',
            propertyValue: values.size,
          },
          // title: {
          //   propertyValue: values.ca,
          //   propertyName: 'title',
          //   shouldChange: !isShoes
          // }
        },
      }).then(() => {
        dispatch(loadingFinished());
        dispatch(showMessage('changes are successfully saved'));

        refreshPage((prevState) => prevState + 1);
      });
    });
  };

  const unavailableInputs = isShoes
    ? {
        price: false,
        productDetails: true,
        amount: false,
        category: false,
        description: true,
        productName: false,
        subcategory: false,
        size: false,
      }
    : {
        price: false,
        productDetails: true,
        amount: false,
        category: false,
        subcategory: false,
        description: true,
        productName: true,
        size: true,
      };

  return (
    <AdminLayout>
      <UserPageHeader
        buttonAvailable={false}
        url={'/admin/catalog'}
        upperText={'Back to catalog'}
        bottomText={'Edit Item'}
      />
      <div className={'m-24'}>
        <div className={'flex flex-row gap-12'}>
          <div className={'flex flex-col w-1/2  '}>
            {product.photos.length !== 0 ? (
              <Slider images={product.photos} />
            ) : (
              <p className={'text-red-800 font-bold text-xl '}>There are no photos here</p>
            )}
            {!isShoes && (
              <div className={'flex flex-col gap-5 my-6'}>
                {product.photos.map((url, index) => {
                  return (
                    <div
                      className={'text-mint font-bold cursor-pointer'}
                      onClick={() => deletePhotoHandler(url)}
                      key={url}
                    >
                      <span className={'text-red-800'}>Delete photo n.</span> {index + 1}
                    </div>
                  );
                })}
              </div>
            )}
            {(!isShoes || _) && <InputForPhotos getPhotos={getPhotos} clearPhotos={_} />}
          </div>
          <div className={'w-1/2'}>
            <ItemForm
              onSubmitHandler={submitHandler}
              initialValues={{ ...product, name: product?.title, productDetails: product?.productDetails }}
              buttonTitle={'save changes'}
              isShoes={isShoes}
              unavailableInputs={unavailableInputs}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditItem;
