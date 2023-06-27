import React from 'react';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import Extras from './components/Extras';
import CartFooter from './components/CartFooter';
import CartHeader from './components/CartHeader';
import bag from '@assets/cartImages/bag.svg';
import paste from '@assets/cartImages/paste.svg';
import LikesGoods from './components/LikesGoods';
import likesCategoryImg1 from '@assets/cartImages/likesCategoryImg1.svg';
import likesCategoryImg2 from '@assets/cartImages/likesCategoryImg2.svg';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose }): React.ReactElement => {
  const cartPurchasedItems = [
    {
      title: 'Sunrise',
      size: 38,
      price: 10,
      countGoods: 1,
    },
    {
      title: 'Sun',
      size: 36,
      price: 100,
      countGoods: 4,
    },
  ];
  const ExtrasItems = [
    {
      name: 'Red bag',
      img: bag,
      price: 10,
      text: 'Would you like to add Name Bag. Which is suitable for your shoes',
    },
    {
      name: 'Paste',
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
      rating: 4,
    },
    {
      title: 'Yolo',
      img: likesCategoryImg2,
      priceFrom: 100,
      rating: 0,
    },
  ];
  return (
    <div className="font-poppins">
      <CartHeader title="Cart" data={cartPurchasedItems} onClose={onClose} />
      <div className="flex flex-col items-center justify-center m-6 gap-4 text-darkGray">
        {!cartPurchasedItems.length ? <EmptyCart title="" /> : null}
        {cartPurchasedItems.length ? (
          <>
            <div className="bg-custom-turquoise w-full h-12 mb-6 flex items-center justify-center text-center p-2 text-sm">
              Items in your cart are not reserved - checkout now to make them yours
            </div>
            {cartPurchasedItems.map((item) => (
              <PurchasedGoods title={item.title} size={item.size} price={item.price} countGoogs={item.countGoods} />
            ))}
          </>
        ) : null}
      </div>
      {cartPurchasedItems.length ? (
        <>
          {ExtrasItems.length ? <h1 className="px-6 text-darkGray text-xl font-semibold">EXTRAS</h1> : null}
          <div className="bg-lightGray flex flex-wrap gap-4 pb-6">
            {ExtrasItems.map((item) => (
              <Extras name={item.name} img={item.img} price={item.price} text={item.text} />
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
          <CartFooter title={'ORDER SUMMARY'} data={cartPurchasedItems} />
        </>
      ) : null}
    </div>
  );
};

export default Cart;
