import React, { useState } from 'react';
import Head from '@/layouts/Head';
import Cart from '@components/Cart';
import { titles } from '@/translations/titles';

interface Props {
  props: any;
}

const HomePage: React.FC<Props> = (): React.ReactElement => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  return (
    <div>
      <Head title={titles.homePage} />
      {!isCartOpen && <button onClick={openCart}>Open Cart</button>}
      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-popup">
            <Cart title="Cart" onClose={closeCart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
