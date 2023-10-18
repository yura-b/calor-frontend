import React, { useEffect, useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import PromoCodesConstructor from '@pages/admin/promocodes/components/PromoCodesConstructor.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import { PromoCodesDto } from '@/api/dto/promoCodes.dto.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { createCoupon, getCoupons } from '@/api/promoCodes.ts';
import PromoCodesGrid from '@pages/admin/promocodes/components/PromoCodesGrid.tsx';
import { Coupon } from '@/constants/interfaces/coupon.ts';
import PromoCodeResult from './components/PromoCodeResult';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

const PromoCodesPage = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState<PromoCodesDto>();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [promoCode, setPromoCode] = useState<string>();
  const [rerender, forceRerender] = useState(0);

  useEffect(() => {
    if (!access_token) return;

    if (coupon) {
      createCoupon(access_token, coupon).then((res) => {
        setPromoCode(res.data);
        forceRerender((prevState) => prevState + 1);
      });
    }
  }, [coupon]);

  useEffect(() => {
    if (!access_token) return;
    dispatch(loading());
    getCoupons(access_token).then((res) => {
      setCoupons(res.data);
      dispatch(loadingFinished());
    });
  }, [rerender]);

  return (
    <AdminLayout>
      <GridHeader title={'Promo Codes'} />
      <div className={'flex flex-row gap-8'}>
        <PromoCodesConstructor setData={setCoupon} />
        {promoCode && <PromoCodeResult promoCode={promoCode} />}
      </div>
      <PromoCodesGrid coupons={coupons} />
    </AdminLayout>
  );
};

export default PromoCodesPage;
