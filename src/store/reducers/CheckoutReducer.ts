import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export enum CheckoutSteps {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}

interface IState extends IContactInfo {
  step: CheckoutSteps;
  order_ids: string[] | null;
  numberOfItems: number;
  shippingPrice: number;
  tax: number;
  totalPrice: number;
  subTotal: number;
}

interface createdOrder {
  order_ids: string[];
  subTotal: number;
  numberOfItems: number;
  shippingPrice: number;
  tax: number;
  totalPrice: number;
}

export const initialState: IState = {
  step: CheckoutSteps.FIRST,
  firstName: '',
  secondName: '',
  email: '',
  order_ids: null,
  totalPrice: 0,
  subTotal: 0,
  numberOfItems: 0,
  shippingPrice: 0,
  tax: 0,
};

interface IContactInfo {
  email: string;
  firstName: string;
  secondName: string;
}

export const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutStep: (state: Draft<IState>, action: PayloadAction<CheckoutSteps>) => {
      state.step = action.payload;
    },
    setContactInfo(state: Draft<IState>, action: PayloadAction<IContactInfo>) {
      const { firstName, secondName, email } = action.payload;
      state.firstName = firstName;
      state.secondName = secondName;
      state.email = email;
    },
    saveOrderIds(state: Draft<IState>, action: PayloadAction<createdOrder>) {
      state.order_ids = action.payload.order_ids;
      state.subTotal = action.payload.subTotal;
      state.totalPrice = action.payload.totalPrice;
      state.numberOfItems = action.payload.numberOfItems;
      state.shippingPrice = action.payload.shippingPrice;
      state.tax = action.payload.tax;
    },
  },
});

export const {
  setCheckoutStep,
  setContactInfo,
  saveOrderIds,
  // saveShippingInfo
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
