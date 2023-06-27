import React, { useState } from 'react';
import Head from '@/layouts/Head';
import Cart from '@components/Cart';
import { titles } from '@/translations/titles';
import { Modal } from '@mui/material';
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
      <Modal className="flex items-center justify-center" open={isCartOpen} onClose={closeCart}>
        <div className="bg-white shadow-lg w-full md:w-1/2 max-h-screen overflow-y-auto">
          <Cart title="Cart" onClose={closeCart} />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
