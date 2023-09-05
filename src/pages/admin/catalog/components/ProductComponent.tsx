import React, { FC, useState } from 'react';
import { Product } from '@/constants/interfaces/product.ts';
import CustomInput from '@/components/input/CustomInput';
import { PencilSimple } from '@phosphor-icons/react';
import CustomButton from '@/components/button/CustomButton';
import { saveNewPrice } from '@/api/products.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';

const ProductComponent: FC<Product> = ({ price, photos, title, category, subcategory, _id }) => {
  const { access_token } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch()

  const [editPrice, setEditPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [currentPrice, setCurrentPrice] = useState(price)

  const onChangeHandler = (setState: React.Dispatch<React.SetStateAction<number>>) => {
    return (e: React.ChangeEvent<any>) => {
      setState(e.target.value);
    };
  };

  const saveHandler = () => {
    if (!access_token) return;
    if (editPrice) {
      dispatch(loading())

      saveNewPrice(access_token, Number(newPrice), _id).then(() => {
        dispatch(showMessage('price was successfully changed'))
        setEditPrice(false)
        setCurrentPrice(newPrice)
      });
    }
    dispatch(loadingFinished())
  };

  return (
    <div className={'flex flex-col gap-5 w-1/5'}>
      <img src={photos[0]} alt={'photo'} className={'aspect-[2/1]'} />
      <p className={'font-bold'}>{title}</p>
      <div className={'flex flex-row'}>
        {typeof category === 'string' ? <p>{category}</p> :
         <>
           <p>{category.categoryTitle} | </p>
           <p className={'ml-2'}> {subcategory}</p>
         </>
      }
      </div>
      <div className={'flex justify-between items-center'}>
        {editPrice ? <CustomInput value={newPrice} onChange={onChangeHandler(setNewPrice)} />
          : <p className={'font-medium'}>{currentPrice}$</p>
        }
        <PencilSimple size={32} weight="fill" onClick={() => setEditPrice(!editPrice)} />
      </div>
      {editPrice && <CustomButton title={'save'} handler={saveHandler} />}
    </div>
  );
};

export default ProductComponent;
