import React from 'react';
import styles from '@styles/Styles.module.scss';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import Extras from './components/Extras';
import CartFooter from './components/CartFooter';
import CartHeader from './components/CartHeader';
import CardGoodsVertical from '@components/CardGoodsVertical';
import bag from '@assets/cartImages/bag.svg';
import paste from '@assets/cartImages/paste.svg';
import shoeModel1 from '@assets/cartImages/shoeModel1.svg';
import shoeModel2 from '@assets/cartImages/shoeModel2.svg';
import { useQuery } from 'react-query';
import { getUser } from "@/api/users";
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose, title }): React.ReactElement => {
  const { access_token, userId } = useSelector((state) => state.user);
  const { data: user, isLoading, isError } = useQuery(['userBasket', getUser], () => getUser(access_token, userId), {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  console.log(user, 'user')
  let cartPurchasedItems = [];

  if (!isLoading) {
    cartPurchasedItems = [...user?.data?.user.basket]
  }

  const ExtrasItems = [
    {
      id: 1,
      name: 'Red bag',
      img: bag,
      price: 10,
      text: 'Would you like to add Name Bag. Which is suitable for your shoes',
    },
    {
      id: 2,
      name: 'Paste',
      img: paste,
      price: 100,
      text: 'Would you like to add Name Care Product matched to your shoes',
    },
  ];
  const LikesGoodsItems = [
    {
      title: 'Dayger',
      img: shoeModel1,
      priceFrom: 10,
      rating: 4,
    },
    {
      title: 'Yolo',
      img: shoeModel2,
      priceFrom: 100,
      rating: 0,
    },
  ];
  return (
    <div className="font-poppins  h-full flex flex-col">
      <CartHeader title={title} onClose={onClose} cartCount={cartPurchasedItems.length} />
      <div className="flex-1 overflow-y-auto md:my-0">
        <div className="flex flex-col  justify-center mx-6 my-4 gap-4 text-gray lg:max-h-[500px] lg:my-12">
          {!cartPurchasedItems.length ? <EmptyCart title="The are no items in your card" /> : null}
          {cartPurchasedItems.length ? (
            <>
              <p
                className={`${styles.body1} bg-custom-turquoise w-full h-auto  flex items-center justify-center text-center p-2 lg:my-4 lg:text-[18px]`}
              >
                Items in your cart are not reserved - checkout now to make them yours
              </p>
              <div className="lg:flex lg:gap-2">
                <div className="h-auto lg:basis-[52%] lg:overflow-auto lg:max-h-[480px] lg:px-4">
                  {cartPurchasedItems.map((item, index) => (
                    <PurchasedGoods
                      title={item.title}
                      size={item.size}
                      price={item.price}
                      countGoogs={item.countGoods}
                      key={index}
                      id={item._id}
                      photo={item.photo}
                    />
                  ))}
                </div>
                {
                  <div className="hidden lg:block lg:basis-[48%]">
                    <CartFooter title={'ORDER SUMMARY'} data={cartPurchasedItems} />
                  </div>
                }
              </div>
            </>
          ) : null}
        </div>
        {cartPurchasedItems.length ? (
          <div className="bg-lightGray">
            {ExtrasItems.length ? <h1 className={`${styles.header1} p-6 lg:text-[1.5rem]`}>EXTRAS</h1> : null}
            <div className="bg-lightGray flex flex-wrap gap-4 pb-6">
              <div className="flex flex-col lg:flex-row gap-4 basis-[100%]">
                {ExtrasItems.map((item) => (
                  <Extras name={item.name} img={item.img} price={item.price} text={item.text} key={item.id} />
                ))}
              </div>
              <hr className="border-t border-gray my-4 w-full mx-6" />
              {LikesGoodsItems.length ? (
                <h1 className={`${styles.header1} px-6 lg:text-[1.5rem]`}>YOU MAY ALSO LIKE</h1>
              ) : null}
              <div className=" flex   w-full gap-4 md:justify-center">
                {LikesGoodsItems.map((item, index) => (
                  <CardGoodsVertical
                    title={item.title}
                    img={item.img}
                    priceFrom={item.priceFrom}
                    rating={item.rating}
                    key={index}
                    buttonClass="transparentGray"
                    className="basis-[48%] px-6 md:max-w-[100%] min-w-[39%] w-full md:basis-[40%] lg:basis-[48%]"
                  />
                ))}
              </div>
            </div>
            {
              <div className="lg:hidden">
                <CartFooter title={'ORDER SUMMARY'} data={cartPurchasedItems} />
              </div>
            }
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
