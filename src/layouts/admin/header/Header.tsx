import React, { useState } from 'react';
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
  Truck,
  Envelope,
  GlobeSimple,
  Package,
  Percent,
  Storefront,
  TextT,
  UserCircle,
  Users,
  VideoCamera,
} from '@phosphor-icons/react';
import CustomSignOut from '@components/logout/SignOut.tsx';
import HeaderElement from '@layouts/admin/header/HeaderElement.tsx';
import { Link } from 'react-router-dom';

const Header = () => {
  const { firstName, secondName } = useAppSelector((state) => state.user);
  const fullName = firstName + ' ' + secondName;

  const [shopDropDown, setShopDropDown] = useState(false);
  const [reviewDropDown, setReviewDropDown] = useState(false);

  const size = window.innerWidth <= 1600 ? 18 : 25;
  const reviewHandler = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    setReviewDropDown((prev) => !prev);
  };
  const shopHandler = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    setShopDropDown((prev) => !prev);
  };

  return (
    <div className={'fixed w-1/6 max-w-1/6 h-full bg-custom-turquoise'}>
      <div className={'flex flex-col justify-center ' + styles.header}>
        <Link to={'/admin'}>
          <div className={'w-full flex justify-center cursor-pointer mt-6'}>
            <img
              src={logo}
              className={'h-full px-5  object-contain  max-w-[300px] w-[260px] lg:transform' + styles.image}
              alt=""
            />
          </div>
        </Link>

        <div
          className={'flex flex-col gap-6 w-full justify-center ml-6  mt-8 2xl:gap-8 2xl:mt-16 ' + styles.navContainer}
        >
          <HeaderElement icon={<ChartBar size={size} weight="fill" />} title={'Analytics'} />
          <div>
            <Storefront size={size} weight="fill" />

            <span>My Shop</span>

            <div className={'ml-8 cursor-pointer'}>
              {shopDropDown ? (
                <CaretUp size={size} weight={'fill'} onClick={shopHandler} />
              ) : (
                <CaretDown onClick={shopHandler} size={size} weight="fill" />
              )}
            </div>
          </div>
          {shopDropDown && (
            <div className={'flex flex-col pl-10 gap-5'}>
              <HeaderElement
                icon={<Package size={size} weight="fill" />}
                title={'Available colors'}
                navigateTo={'/admin/warehouse'}
              />
              <HeaderElement
                icon={<Book size={size} weight="fill" />}
                title={'Catalog'}
                navigateTo={'/admin/catalog'}
              />
              <HeaderElement
                icon={<ClipboardText size={size} weight="fill" />}
                title={'Orders'}
                navigateTo={'/admin'}
              />
              <HeaderElement
                icon={<Truck size={size} weight="fill" />}
                title={'Delivery prices'}
                navigateTo={'/admin/delivery'}
              />
            </div>
          )}
          <HeaderElement icon={<Users size={size} weight="fill" />} title={'Customers'} navigateTo={'/admin/users'} />
          <div>
            <ChatDots size={size} weight="fill" />

            <span>Reviews</span>

            <div className={'ml-8 cursor-pointer'}>
              {reviewDropDown ? (
                <CaretUp weight={'fill'} size={size} onClick={reviewHandler} />
              ) : (
                <CaretDown onClick={reviewHandler} size={size} weight="fill" />
              )}
            </div>
          </div>
          {reviewDropDown && (
            <div className={'flex flex-col pl-10 gap-5'}>
              <HeaderElement
                icon={<TextT size={size} weight="fill" />}
                title={'Text Reviews'}
                navigateTo={'/admin/reviews/text'}
              />
              <HeaderElement icon={<VideoCamera size={size} weight="fill" />} title={'Video Reviews'} />
            </div>
          )}

          <HeaderElement icon={<Calendar size={size} weight="fill" />} title={'Appointments'} />
          <HeaderElement icon={<Envelope size={size} weight="fill" />} title={'Newsletter'} />
          <HeaderElement
            icon={<Percent size={size} weight="fill" />}
            title={'Promo codes'}
            navigateTo={'/admin/promocodes'}
          />
          <HeaderElement
            icon={<Browsers size={size} weight="fill" />}
            title={'Page manager'}
            navigateTo={'/admin/manager'}
          />
        </div>

        <div className={'flex flex-col justify-center gap-6 2xl:gap-9 ml-6 absolute bottom-5 ' + styles.navContainer}>
          <HeaderElement icon={<GlobeSimple size={size} />} title={'Go To Calor'} navigateTo={'/'} />
          <div>
            <UserCircle size={size} weight="fill" />
            <span>{fullName}</span>
          </div>

          <CustomSignOut size={size} />
        </div>
      </div>
    </div>
  );
};

export default Header;
