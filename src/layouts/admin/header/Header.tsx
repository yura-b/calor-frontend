import React, { ReactEventHandler, useState } from 'react';
import styles from './Header.module.scss';
import logo from '../../../assets/images/logoText.svg';
import { useAppSelector } from '@/store/hooks/hooks';
import {
  Book,
  Browsers,
  Calendar,
  CaretDown,
  CaretUp,
  ChartBar,
  ChatDots,
  ClipboardText,
  Envelope, GlobeSimple,
  Package,
  Percent,
  Storefront, TextT, UserCircle,
  Users, VideoCamera
} from '@phosphor-icons/react';
import CustomSignOut from '@components/logout/SignOut.tsx';
import { useNavigate } from 'react-router';

const Header = () => {
  const { firstName, secondName } = useAppSelector((state) => state.user);
  const fullName = firstName + ' ' + secondName;

  const [shopDropDown, setShopDropDown] = useState(false);
  const [reviewDropDown, setReviewDropDown] = useState(false);

  const navigate = useNavigate()

  const size = 28;


  const navigateTo = (location: string) => {
    navigate(location)
  }

  const reviewHandler = (e: React.MouseEvent<any>) => {
    e.preventDefault()
    setReviewDropDown(prev => !prev);
  };
  const shopHandler = (e: React.MouseEvent<any>) => {
    e.preventDefault()
    setShopDropDown(prev => !prev);
  };


  return (
    <div className={'fixed w-1/6 h-full bg-custom-grey'}>
      <div className={'flex flex-col justify-center ' + styles.header}>
        <div className={'w-full flex justify-center'}>
          <img src={logo} className={'w-full h-full p-3 mt-6 ' + styles.image} alt="" />
        </div>

        <div className={'flex flex-col gap-12 w-full justify-center ml-6  mt-16 ' + styles.navContainer}>
          <div>
            <ChartBar size={size} weight="fill" />
            <span>Analytics</span>
          </div>
          <div>
            <Storefront size={size} weight="fill" />

            <span>My Shop</span>

            <div className={'ml-16 cursor-pointer'}>
              {shopDropDown ? <CaretUp size={size} weight={'fill'} onClick={shopHandler} /> :
                <CaretDown onClick={shopHandler} size={size} weight="fill" />}
            </div>
          </div>
          {shopDropDown && <div className={'flex flex-col pl-10 gap-5'}>
            <div>
              <Package size={32} weight="fill" />
              <span>Warehouse</span>
            </div>
            <div>
              <Book size={32} weight="fill" />
              <span>Catalog</span>
            </div>
            <div onClick={()=>{
              navigateTo('/admin')
            }}>
              <ClipboardText size={32} weight="fill" />
              <span>Orders</span>
            </div>
          </div>}
          <div onClick={()=> {
            navigateTo('/admin/users')
          }}>
            <Users size={size} weight="fill" />
            <span>Customers</span>
          </div>
          <div>
            <ChatDots size={size} weight="fill" />

            <span>Reviews</span>

            <div className={'ml-16 cursor-pointer'}>
              {reviewDropDown ? <CaretUp weight={'fill'} size={size} onClick={reviewHandler} /> :
                <CaretDown onClick={reviewHandler} size={size} weight="fill" />}
            </div>
          </div>
          {reviewDropDown && <div className={'flex flex-col pl-10 gap-5'}>
            <div>
              <TextT size={32} weight="fill" />
                <span>Text Reviews</span>
            </div>
            <div>
              <VideoCamera size={32} weight="fill" />
              <span>Video Reviews</span>
            </div>
          </div>}
          <div>
            <Calendar size={size} weight="fill" />
            <span> Appointments</span>
          </div>
          <div>
            <Envelope size={size} weight="fill" />
            <span>Newsletter</span>
          </div>
          <div>
            <Percent size={size} weight="fill" />
            <span>Promo codes</span>
          </div>
          <div>
            <Browsers size={size} weight="fill" />
            <span>Page manager</span>
          </div>
        </div>

        <div className={'flex flex-col justify-center gap-12 ml-6 mt-52 ' + styles.navContainer}>
          <div>
            <GlobeSimple size={32} />
            <span>
              Go To Calor
            </span></div>
          <div>
            <UserCircle size={32} weight="fill" />
            <span>
              {fullName}
            </span>
          </div>

          <CustomSignOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
