import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Role} from '@/constants/enums/role.enum.ts';


export interface IUser {
    access_token: string | null,
    username: string,
    phoneNumber: string
    userId: string,
    roles: Role[] | null
}


export const initialState: IUser = {
    access_token: localStorage.getItem('access_token'),
    phoneNumber: '',
    username: '',
    userId: '',
    roles: null
}
export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            const {access_token, userId, phoneNumber = '', username, roles} = action.payload
            state.access_token = access_token
            state.username = username
            state.phoneNumber = phoneNumber
            state.userId = userId
            state.roles = roles

            if (access_token) localStorage.setItem('access_token', access_token)

        }
    },
});

export const {setUserData} = UserSlice.actions;

export default UserSlice.reducer;
