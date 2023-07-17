import {Role} from '@/constants/enums/role.enum.ts';

export interface IUser {
    email: string
    email_verified: boolean
    firstName: string
    secondName:string
    googleAccount: boolean
    phoneNumber: string | null
    registrationDate: string
    roles: Role[]
    _id: string
}
