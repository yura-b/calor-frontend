import { Role } from '@/constants/enums/role.enum.ts';

export interface IUser {
  email: string;
  email_verified: boolean;
  firstName: string;
  secondName: string;
  googleAccount: boolean;
  phoneNumber: string | null;
  registrationDate: Date | null;
  roles: Role[];
  _id: string;
}

export type IUserForProfile = Omit<IUser, 'registrationDate' | 'roles' | '_id' | 'googleAccount' | 'email_verified'>;
