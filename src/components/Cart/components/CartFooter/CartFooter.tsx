import React, { useEffect, useState } from 'react';
import Button from '@components/ui/Button';
import styles from '@styles/Styles.module.scss';
import { useFormik } from 'formik';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForPromoCode } from '@/helpers/validation/formValidation.ts';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import { useNavigate } from 'react-router';
import { BasketProduct } from '@/store/reducers/BasketSlice';

interface IProps {
  title: string;
  data?: BasketProduct[];
}

const CartFooter: React.FC<IProps> = ({ title, data }): React.ReactElement => {
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsTotal = data?.reduce((acc, item) => {
      const price = item?.shoes?.price || item?.accessory?.price || item?.price || 0;
      const count = item?.shoes?.count || item?.accessory?.count || item?.count || 0;
      return acc + price * count;
    }, 0);

    setTotal(productsTotal?.toFixed(2));
  }, [data]);
  const [showPromoCodeForm, setShowPromoCodeForm] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);

  const addPromoCode = () => {
    setShowPromoCodeForm(true);
    setPromoCodeApplied(false);
  };

  const handleClick = () => {
    navigate('/checkout');
  };

  const handlePromoCodeApplied = () => {
    setPromoCodeApplied(true);
    setShowPromoCodeForm(false);
  };
  const handleFormClose = () => {
    setShowPromoCodeForm(false);
  };
  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    validationSchema: validationSchemaForPromoCode,
    onSubmit: (values) => {
      console.log(values);
      handlePromoCodeApplied();
    },
  });

  return (
    <div className="px-6 py-2.5 text-gray lg:pt-0">
      <h1 className={`${styles.header1} my-4 lg:mt-0 lg:text-[1.5rem]`}>{title}</h1>
      <div className={`${styles.body2} lg:text-[]`}>
        <div className="flex justify-between mt-4 items-center">
          <p>Discount</p>
          <p>-$ XXX</p>
        </div>
        <div className={`${styles.body2} flex justify-between mt-4 items-center font-bold text-mint`}>
          <p>Subtotal</p>
          <p>$ {total}</p>
        </div>
        {promoCodeApplied && !showPromoCodeForm && (
          <Button color="transparentMint" onClick={addPromoCode} className="mt-6 max-w-[100%] block m-auto">
            Add Promo Code +
          </Button>
        )}
        {showPromoCodeForm && (
          <motion.div {...fadeAnimation}>
            <form onSubmit={formik.handleSubmit} className={'mb-4 basis-[100%] lg:basis-[40%] '}>
              <p className={`${styles.body2} font-bold mb-0 lg:-mb-4 mt-4`}>Your Promo Code</p>
              <div className="relative">
                <CustomInput
                  id={'promoCode'}
                  name={'promoCode'}
                  placeholder={'Promo Code'}
                  value={formik.values.promoCode}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.promoCode}
                  error={formik.touched.promoCode && Boolean(formik.errors.promoCode)}
                />
                <button className="absolute top-8 right-4  rotate-45 text-[34px]" onClick={handleFormClose}>
                  +
                </button>
              </div>
              <Button color="transparentMint" type="submit" className="max-w-[100%] block m-auto">
                Apply Promo Code
              </Button>
            </form>
          </motion.div>
        )}
        {promoCodeApplied && (
          <div className="bg-custom-turquoise p-2 mt-4">
            Promo Code Applied <div className="inline border border-gray rounded-full  px-1.5 py-0">&#x2713;</div>
          </div>
        )}{' '}
        <Button color="mint" className="mt-4 max-w-[100%] block m-auto" onClick={handleClick}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
