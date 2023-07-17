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
  roles: localStorage.getItem('roles')?.split(',') as Role[],
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
        rememberMe = true,
      } = action.payload;

      state.access_token = access_token;
      state.firstName = firstName;
      state.secondName = secondName;
      state.phoneNumber = phoneNumber;
      state.userId = userId;
      state.roles = roles;

      if (access_token && rememberMe) localStorage.setItem('access_token', access_token);
      if (access_token && rememberMe && roles) localStorage.setItem('roles', roles?.join(','));
    },
    cleanUserData:(state) => {

      localStorage.removeItem('access_token')
      localStorage.removeItem('roles')


      state.access_token = initialState.access_token;
      state.roles = initialState.roles;
      state.userId = initialState.userId;
      state.phoneNumber = initialState.phoneNumber;
      state.firstName = initialState.firstName;
      state.secondName = initialState.secondName
    }
  },
});

export const { setUserData, cleanUserData } = UserSlice.actions;

export default UserSlice.reducer;
