import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

export enum CheckoutSteps {
    FIRST = 0,
    SECOND = 1,
    THIRD = 2,
}

interface IState extends IContactInfo {
    step: CheckoutSteps,
    order_id: string | null
}

export const initialState: IState = {
    step: CheckoutSteps.FIRST,
    firstName: '',
    secondName: '',
    phoneNumber: '',
    email: '',
    order_id: null
};

interface IContactInfo {
    email: string,
    firstName: string,
    secondName: string,
    phoneNumber: string
}

export const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutStep: (state: Draft<IState>, action: PayloadAction<CheckoutSteps>) => {
            state.step = action.payload;
        },
        setContactInfo(state: Draft<IState>, action: PayloadAction<IContactInfo>) {
            const {firstName, secondName, phoneNumber, email} = action.payload
            state.firstName = firstName
            state.secondName = secondName
            state.email = email
            state.phoneNumber = phoneNumber
        },
        saveOrderIds(state: Draft<IState>, action: PayloadAction<string>) {
            state.order_id = action.payload
        }
        // saveShippingInfo(State: Draft<IState>, action: PayloadAction<ShippingInfoDto>) {
        //     const {
        //         save,
        //         ZIP,
        //         user_id,
        //         ASB, receiverSecondName,
        //         receiverFirstName,
        //         state,
        //         city,
        //         streetAddress
        //     } = action.payload
        //
        //
        //     State.ASB= ASB
        //     State.save = save
        //     State.ZIP = ZIP
        //     State.user_id = user_id
        //     State.receiverFirstName = receiverFirstName
        //     State.receiverSecondName = receiverSecondName
        //     State.state = state
        //     State.city = city
        //     State.streetAddress = streetAddress
        // }
    }

});

export const {
    setCheckoutStep,
    setContactInfo,
    saveOrderIds
    // saveShippingInfo
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
