
import React, {useEffect, useState} from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';
import {IBaseProduct, Product} from '@/constants/interfaces/product.ts';
import {useAppDispatch, useAppSelector} from '@/store/hooks/hooks.ts';
import {loading, loadingFinished} from '@/store/reducers/StatusReducer.ts';
import {addVariant, assignVariation, getAccessories, getVariants} from '@/api/products.ts';
import {EditVariationElementDto} from '@/api/dto/products.dto.ts';
import ModalWindow from '@pages/admin/catalog/variations/components/ModalWindow.tsx';
import ProductRow from '@pages/admin/catalog/variations/components/ProductWithoutVariations.tsx';
import Navigation from '@components/admin/Navigation.tsx';
import ExistingVariation from '@pages/admin/catalog/variations/components/ExistingVariation.tsx';
import ChosenVariation from '@pages/admin/catalog/variations/components/ChosenVariation.tsx';

enum navigation {
    existed = 'Existing variations',
    withoutVariation = 'Products without variations'
}

const navigationArr = [navigation.existed, navigation.withoutVariation]

const VariationsPage = () => {
    const {access_token} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [navigationState, setNavigationState] = useState<string>(navigation.existed)
    const [rerender, forceRerender] = useState(0);
    const [currentVariantId, setCurrentVariantId] = useState<string | null>(null);
    const [open, setOpenModal] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<{ variations: IBaseProduct[]; _id: string }[]>();

    const [possibleVariationIds, setPossibleVariationIds] = useState<string[]>([]);

    const productsWithoutVariations = products.filter(
        (product) => !product.variations && !possibleVariationIds.includes(product._id)
    );

    const possibleVariation = products.filter(
        (product) => !product.variations && possibleVariationIds.includes(product._id)
    );

    useEffect(() => {
        dispatch(loading());
        getAccessories().then((res) => {
            setProducts(res.data);
        });
        getVariants().then((res) => {
            setVariants(res.data);
        });

        dispatch(loadingFinished());
    }, [rerender]);

    const createVariation = () => {
        if (!access_token) return;
        assignVariation(access_token, possibleVariationIds).then(() => {
            setPossibleVariationIds([]);
            forceRerender((prevState) => prevState + 1);
        });
    };

    const pushToVariantList = (data: EditVariationElementDto) => {
        if (!access_token) return;
        addVariant(access_token, data).then(() => {
            forceRerender((prevState) => prevState + 1);
        });
    };
    const addToVariationList = (_id: string) => {
        setPossibleVariationIds((prevState) => [...new Set([...prevState, _id])]);
    };

    const removeFromVariationList = (_id: string) => {
        setPossibleVariationIds((prevState) => prevState.filter((el) => el !== _id));
    };

    if (!products) return;

    return (
        <AdminLayout>
            <UserPageHeader
                buttonAvailable={false}
                url={'/admin/catalog'}
                upperText={'Back to catalog'}
                bottomText={'Variations'}
            />

            <div className={'p-5'}>
                <Navigation setState={setNavigationState} state={navigationState} array={navigationArr}/>


                {navigationState === navigation.existed && <ExistingVariation
                    variants={variants}
                    forceRerender={forceRerender}
                    setCurrentVariantId={setCurrentVariantId}
                    setOpenModal={setOpenModal}
                />}

                {navigationState === navigation.withoutVariation && <div className={'flex flex-col gap-12 mb-24'}>
                    <ProductRow
                        products={productsWithoutVariations}
                        title={'Product without variations:'}
                        handler={addToVariationList}
                    />

                    {possibleVariation.length !== 0 &&
                        <ChosenVariation products={possibleVariation} saveHandler={createVariation}
                                         handler={removeFromVariationList}/>}
                    {/* <ProductRow products={possibleVariation} handler={removeFromVariationList} title={'Chosen Variation:'}/> */}
                    {/* <CustomButton title={'Create variation'} handler={createVariation} styles={'w-[300px]'}/> */}
                </div>}

            </div>
            <ModalWindow
                closeModal={setOpenModal}
                open={open}
                currentId={currentVariantId}
                handler={pushToVariantList}
                items={productsWithoutVariations.map((item) => ({
                    ...item,
                    photo: item.photos[0],
                }))}
            />
        </AdminLayout>
    );
};

export default VariationsPage;
