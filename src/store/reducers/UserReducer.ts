import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/constants/enums/role.enum.ts';

export interface IUser {
  access_token: string | null;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  userId: string;
  roles: Role[] | null;
}

export const initialState: IUser = {
  access_token: localStorage.getItem('access_token'),
  phoneNumber: '',
  firstName: '',
  secondName: '',
  userId: '',
  roles: null,
};

export interface ISetUserData extends IUser {
  rememberMe?: boolean;
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ISetUserData>) => {
      const {
        access_token,
        userId,
        phoneNumber = '',
        firstName,
        secondName,
        roles,
        rememberMe = false,
      } = action.payload;

      state.access_token = access_token;
      state.firstName = firstName;
      state.secondName = secondName;
      state.phoneNumber = phoneNumber;
      state.userId = userId;
      state.roles = roles;

      if (access_token && rememberMe) localStorage.setItem('access_token', access_token);
    },
  },
});

export const { setUserData } = UserSlice.actions;

export default UserSlice.reducer;
