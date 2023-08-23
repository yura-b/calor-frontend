import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/constants/enums/role.enum.ts';
import { Basket } from '@/constants/interfaces/basket.ts';

export interface IUser {
  access_token: string | null;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  userId: string;
  roles: Role[] | null;
  basket: Basket[] | null;
}

export const initialState: IUser = {
  access_token: localStorage.getItem('access_token'),
  phoneNumber: '',
  firstName: '',
  secondName: '',
  userId: '',
  email: '',
  roles: localStorage.getItem('roles')?.split(',') as Role[],
  basket: null,
};

export interface ISetUserData extends IUser {
  rememberMe?: boolean;
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state: Draft<IUser>, action: PayloadAction<ISetUserData>) => {
      const {
        access_token,
        userId,
        phoneNumber = '',
        firstName,
        secondName,
        roles,
        rememberMe = true,
        basket,
        email,
      } = action.payload;
      if (access_token) state.access_token = access_token;

      state.firstName = firstName;
      state.secondName = secondName;
      state.phoneNumber = phoneNumber;
      state.userId = userId;
      state.roles = roles;
      state.basket = basket;
      state.email = email;

      if (access_token && rememberMe) localStorage.setItem('access_token', access_token);
      if (access_token && rememberMe && roles) localStorage.setItem('roles', roles?.join(','));
    },
    cleanUserData: (state: Draft<IUser>) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('roles');

      state.access_token = null;
      state.roles = initialState.roles;
      state.userId = initialState.userId;
      state.phoneNumber = initialState.phoneNumber;
      state.firstName = initialState.firstName;
      state.secondName = initialState.secondName;
      state.basket = initialState.basket;
      state.email = initialState.email;
    },
  },
});

export const { setUserData, cleanUserData } = UserSlice.actions;

export default UserSlice.reducer;
