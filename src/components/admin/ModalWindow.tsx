import * as React from 'react';
import { FC, Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IOrder } from '@/constants/interfaces/order.ts';
import RefundToggle from '@components/admin/Toggle/RefundToggle.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { refundMoney } from '@/api/orders.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { PaymentEnum } from '@/constants/enums/payments.enum.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface IProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  orders: IOrder[],
  order_id: string
}

const ModalWindow: FC<IProps> = ({ setOpen, open, orders, order_id }) => {
  const [ids, setIds] = useState<string[]>([]);
  const [customPrice, setCustomPrice] = useState(0);
  const { access_token } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch()
  const customPriceHandler = (setPrice: React.Dispatch<React.SetStateAction<number>>) => {
    return (e: React.ChangeEvent<any>) => {
      setPrice(e.target.value);
    };
  };
  if (!orders) return;



  const tax = orders.reduce((accum, order) => {
    return accum += order.tax;
  }, 0);
  let payment: PaymentEnum | string | undefined = orders.find(order => order.payment)?.payment;

  if (payment === PaymentEnum.STRIPE) payment = 'stripe';
  if (payment === PaymentEnum.PayPal) payment = 'paypal';

  const handleReturn = () => {
    if (!access_token || (payment !== 'stripe' && payment !== 'paypal')) return;
    refundMoney(access_token, { custom_price: customPrice, order_id, orders_id: ids }, payment).then(res=>{
      console.log(res);
      dispatch(showMessage('orders was successfully refunded'))
      setOpen(false);
    });

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{'This order contain:'}</DialogTitle>
      <DialogContent>
        <div className={'flex flex-col gap-12'}>
          <div className={'grid grid-cols-3 gap-5 w-[400px]'}>
            {orders.map(order => {
              return <Fragment key={order._id}>
                <span>{order.shoes?.title || order.accessory?.price}</span>
                <span>{order.shoes?.price || order.accessory?.price}$</span>
                {/* <span>{order.tax || order.tax}$</span>*/}
                <RefundToggle available={false} _id={order._id} handler={setIds} />
              </Fragment>;
            })}
          </div>
          <div className={'flex flex-row gap-6'}>
            <p>Shipping Price: 20$</p>
            <p>tax: {tax}$</p>
          </div>
          <div className={'flex flex-col gap-3'}>
            <p className={'font-medium'}>or enter by your self <span
              className={'ml-12 italic font-bold'}>!more priority</span></p>
            <CustomInput onChange={customPriceHandler(setCustomPrice)} type={InputType.number} value={customPrice}>
              Custom Price
            </CustomInput>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
        <Button onClick={handleReturn}>Return</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ModalWindow;