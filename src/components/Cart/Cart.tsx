import React from 'react';
import basketImage from '@/assets/cartImages/basketIcon.svg';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import Extras from './components/Extras';
import bag from '@assets/cartImages/bag.svg';
import paste from '@assets/cartImages/paste.svg';
import LikesGoods from './components/LikesGoods';
import likesCategoryImg1 from '@assets/cartImages/likesCategoryImg1.svg';
import likesCategoryImg2 from '@assets/cartImages/likesCategoryImg2.svg';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  const cartPurchasedItems = [
    {
      title: 'Sunrise',
      size: 38,
      price: 10,
    },
    {
      title: 'Sun',
      size: 36,
      price: 100,
    },
  ];
  const ExtrasItems = [
    {
      img: bag,
      price: 10,
      text: 'Would you like to add Name Bag. Which is suitable for your shoes',
    },
    {
      img: paste,
      price: 100,
      text: 'Would you like to add Name Care Product matched to your shoes',
    },
  ];
  const LikesGoodsItems = [
    {
      title: 'Dayger',
      img: likesCategoryImg1,
      priceFrom: 10,
      rating: 1,
    },
    {
      title: 'Yolo',
      img: likesCategoryImg2,
      priceFrom: 100,
      rating: 4,
    },
  ];
  return (
    <div className="font-poppins">
      <div className="h-16 flex items-center w-full bg-red text-white">
        <p className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">{title.toUpperCase()}</p>
        <div className="ml-auto flex">
          <div className="relative mr-6">
            <img src={basketImage} alt="Basket" className="mr-2" />
            {cartPurchasedItems.length ? (
              <span className="absolute top-0 right-0 bg-green text-white rounded-full p-1 text-xs w-4 h-4 flex items-center justify-center">
                {cartPurchasedItems.length}
              </span>
            ) : (
              ''
            )}
          </div>
          <img src={closeBtnImage} onClick={onClose} className="mr-6" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center m-6 gap-4 text-darkGray">
        {!cartPurchasedItems.length ? (
          <>
            <div className="bg-lightGreen w-full h-12 mb-6 flex items-center justify-center text-center p-2 text-sm">
              The are no items in your card
            </div>
            <EmptyCart title="" />
          </>
        ) : (
          ''
        )}
        {cartPurchasedItems.length ? (
          <>
            <div className="bg-lightGreen w-full h-12 mb-6 flex items-center justify-center text-center p-2 text-sm">
              Items in your cart are not reserved - checkout now to make them yours
            </div>
            {cartPurchasedItems.map((item) => (
              <PurchasedGoods title={item.title} size={item.size} price={item.price} />
            ))}
          </>
        ) : (
          ''
        )}
      </div>
      <h1 className="px-6 text-darkGray text-xl font-semibold">EXTRAS</h1>
      <div className="bg-lightGray flex flex-wrap gap-4">
        {ExtrasItems.map((item) => (
          <Extras img={item.img} price={item.price} text={item.text} />
        ))}
        <hr className="border-t border-darkGray my-4 w-full mx-6" />
        <div>
          <h1 className="px-6 text-darkGray text-xl font-semibold">YOU MAY ALSO LIKE</h1>
          <div className="mx-6 flex gap-2.5">
            {LikesGoodsItems.map((item) => (
              <LikesGoods title={item.title} img={item.img} priceFrom={item.priceFrom} rating={item.rating} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
