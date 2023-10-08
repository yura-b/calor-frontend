import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import { Product } from '@/constants/interfaces/product.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { assignVariation, getAccessories } from '@/api/products.ts';
import ProductVariation from '@pages/admin/catalog/variations/components/ProductVariation.tsx';
import CustomButton from '@components/button/CustomButton.tsx';


const VariationsPage = () => {
  const { access_token } = useAppSelector(state => state.user)

  const [products, setProducts] = useState<Product[]>([]);

  const [possibleVariationIds, setPossibleVariationIds] = useState<string[]>([])

  const productsWithoutVariations = products.filter(product => !product.variations && !possibleVariationIds.includes(product._id))

  const possibleVariation = products.filter(product => !product.variations && possibleVariationIds.includes(product._id))

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loading());
    getAccessories().then((res) => {
      setProducts(res.data);
    });

    dispatch(loadingFinished());
  }, []);
  
  const createVariation =()=>{
    if (!access_token) return
    assignVariation(access_token, possibleVariationIds).then(res=> {
      console.log(res);
    })
  }

  const addToVariationList = (_id: string) =>{
    setPossibleVariationIds(prevState => [...new Set([...prevState, _id])])
  }

  const removeFromVariationList = (_id: string) =>{
    setPossibleVariationIds(prevState => prevState.filter(el => el !== _id))
  }


  if (!products) return


  return (
    <AdminLayout>
      <UserPageHeader
        buttonAvailable={false}
        url={'/admin/catalog'}
        upperText={'Back to catalog'}
        bottomText={'Variations'}
      />


    <div className={'p-5'}>

      <div  className={'flex flex-col gap-12 mt-6 mb-8'}>
        <h1 className={'font-bold text-lg'}>Product without variations</h1>
        <ProductVariation productList={productsWithoutVariations} handler={addToVariationList} />
      </div>

      <div className={'flex flex-col gap-12'}>
        <h1 className={'font-bold text-lg'}>Chosen Variation</h1>

        <ProductVariation productList={possibleVariation} handler={removeFromVariationList} />
        
        <CustomButton title={'Create variation'} handler={createVariation} styles={'w-[300px]'}/>
      </div>


    </div>
    </AdminLayout>

);
};

export default VariationsPage;