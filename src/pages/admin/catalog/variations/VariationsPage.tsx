import React, {useEffect, useState} from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import {IBaseProduct, Product} from '@/constants/interfaces/product.ts';
import {useAppDispatch, useAppSelector} from '@/store/hooks/hooks.ts';
import {loading, loadingFinished} from '@/store/reducers/StatusReducer.ts';
import {addVariant, assignVariation, deleteVariant, getAccessories, getVariants} from '@/api/products.ts';
import ProductVariation from '@pages/admin/catalog/variations/components/ProductVariation.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import {EditVariationElementDto} from '@/api/dto/products.dto.ts';
import ModalWindow from '@pages/admin/catalog/variations/components/ModalWindow.tsx';


const VariationsPage = () => {
    const {access_token} = useAppSelector(state => state.user)

    const [open, setOpenModal] = useState(false)

    const [products, setProducts] = useState<Product[]>([]);
    const [rerender, forceRerender] = useState(0)
    const [variants, setVariants] = useState<{ variations: IBaseProduct[], _id: string }[]>()
    const [possibleVariationIds, setPossibleVariationIds] = useState<string[]>([])

    const productsWithoutVariations = products.filter(product => !product.variations && !possibleVariationIds.includes(product._id))

    const possibleVariation = products.filter(product => !product.variations && possibleVariationIds.includes(product._id))

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loading());
        getAccessories().then((res) => {
            console.log('here')
            setProducts(res.data);
        });
        getVariants().then(res => {
            console.log(res)
            setVariants(res.data)
        })

        dispatch(loadingFinished());
    }, [rerender]);

    const createVariation = () => {
        if (!access_token) return
        assignVariation(access_token, possibleVariationIds).then(() => {
            forceRerender(prevState => prevState + 1)
        })
    }

    const deleteFromDBVariation = (data: EditVariationElementDto) => {
        if (!access_token) return
        deleteVariant(access_token, data).then(() => {
            forceRerender(prevState => prevState + 1)
        })
    }

    const pushToVariantList = (data: EditVariationElementDto) => {
        if (!access_token) return
        addVariant(access_token, data).then(() => {
            forceRerender(prevState => prevState++)
        })
    }
    const addToVariationList = (_id: string) => {
        setPossibleVariationIds(prevState => [...new Set([...prevState, _id])])
    }

    const removeFromVariationList = (_id: string) => {
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
                <div className={'flex flex-col gap-12 mt-6 mb-8'}>
                    <h1 className={'font-bold text-lg'}>Product without variations</h1>
                    <ProductVariation productList={productsWithoutVariations} handler={addToVariationList}/>
                </div>

                {possibleVariation.length > 0 && <div className={'flex flex-col gap-12 mb-12 '}>
                    <h1 className={'font-bold text-lg'}>Chosen Variation</h1>

                    <ProductVariation productList={possibleVariation} handler={removeFromVariationList}/>

                    <CustomButton title={'Create variation'} handler={createVariation} styles={'w-[300px]'}/>
                </div>}

                <h1 className={'font-bold text-lg mb-12'}>Existed variations:</h1>


                {variants?.map(variant => {
                    const customHandler = (_id: string) => {
                        deleteFromDBVariation({variantId: variant._id, elementId: _id})
                    }

                    return <div key={variant._id} className={'flex flex-col gap-8'}>
                        <ProductVariation key={variant._id}
                                          productList={variant.variations.map(variant => ({
                                              ...variant,
                                              photos: [variant.photo]
                                          }))}
                                          handler={customHandler}/>

                        <div className={'flex flex-row justify-start gap-8'}>
                            <CustomButton title={'Add Item'} handler={()=>setOpenModal(true)} />
                        </div>

                        <hr/>
                    </div>
                })}

            </div>
            <ModalWindow closeModal={setOpenModal} open={open}/>
        </AdminLayout>

    );
};

export default VariationsPage;
