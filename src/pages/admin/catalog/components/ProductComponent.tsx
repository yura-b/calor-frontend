import React, { FC, useState } from 'react';
import { Product } from '@/constants/interfaces/product.ts';
import CustomInput from '@/components/input/CustomInput';
import { PencilSimple } from '@phosphor-icons/react';
import CustomButton from '@/components/button/CustomButton';
import { deleteAccessory, saveDiscountPrice, saveNewPrice } from '@/api/products.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';
import { useNavigate } from 'react-router';

const ProductComponent: FC<Product> = ({ price, photos, title, category, subcategory, _id, oldPrice }) => {
  const isShoes = typeof category === 'string';

  const navigate = useNavigate();
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [editPrice, setEditPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [discountPrice, setDiscountPrice] = useState(oldPrice || 0);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = () => {
    if (!access_token) return;
    deleteAccessory(access_token, _id).then(() => {
      dispatch(showMessage('item was successfully deleted'));
      setIsDeleted(true);
    });
  };
  const onChangeHandler = (setState: React.Dispatch<React.SetStateAction<number>>) => {
    return (e: React.ChangeEvent<any>) => {
      setState(e.target.value);
    };
  };

  const savePrice = () => {
    if (!access_token) return;
    if (editPrice) {
      dispatch(loading());

      saveNewPrice(access_token, Number(newPrice), _id).then(() => {
        dispatch(showMessage('price was successfully changed'));
        setEditPrice(false);
        setCurrentPrice(newPrice);
      });
    }
    dispatch(loadingFinished());
  };
  const saveDiscountPriceHandler = () => {
    if (!access_token) return;
    if (editPrice) {
      dispatch(loading());

      saveDiscountPrice(access_token, Number(discountPrice), _id).then(() => {
        dispatch(showMessage('discount price was successfully changed'));
        setEditPrice(false);
        setDiscountPrice(discountPrice);
      });
    }
    dispatch(loadingFinished());
  };

  if (isDeleted) return <></>;

  return (
    <div className={'flex flex-col gap-5 w-1/5'}>
      <img
        src={photos[0]}
        alt={'photo'}
        className={'aspect-[2/1] h-[200px] object-contain'}
        onClick={() => {
          navigate(`/admin/edititem/${_id}`);
        }}
      />
      <p className={'font-bold'}>{title}</p>
      <div className={'flex flex-row'}>
        {isShoes ? (
          <p>{category}</p>
        ) : (
          <>
            <p>{category.categoryTitle} | </p>
            <p className={'ml-2'}> {subcategory}</p>
          </>
        )}
      </div>
      <div className={'flex justify-between items-center'}>
        {editPrice ? (
          <div className={'flex flex-col gap-6'}>
            <div>
              <p>Actual Price:</p>
              <CustomInput value={newPrice} onChange={onChangeHandler(setNewPrice)} />
              {editPrice && <CustomButton title={'save'} handler={savePrice} />}
            </div>
            <div>
              <p>Old price:</p>
              <CustomInput value={discountPrice} onChange={onChangeHandler(setDiscountPrice)} />
              {editPrice && <CustomButton title={'save'} handler={saveDiscountPriceHandler} />}
            </div>
          </div>
        ) : (
          <div className={'flex flex-col'}>
            <p className={'font-medium'}>current price: $ {currentPrice}</p>
            {!!discountPrice && <p className={'font-medium'}>old price: <span className={'text-red-500 line-through'}>$ {discountPrice}</span></p>}
          </div>
        )}
        <PencilSimple size={32} weight="fill" onClick={() => setEditPrice(!editPrice)} />
      </div>
      {editPrice && !isShoes && <CustomButton title={'delete'} handler={deleteHandler} bgColor={'red'} />}
    </div>
  );
};

export default ProductComponent;
