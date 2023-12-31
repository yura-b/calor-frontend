import React, { ReactNode } from 'react';
import { IUser, IUserForProfile } from '@/constants/interfaces/user.ts';
import { ArrowsHorizontal, ChatText, User } from '@phosphor-icons/react';
import IsRegistered from '@components/admin/IsRegistered.tsx';
import DefaultShippingInfo from '@pages/admin/users/components/userProfile/components/DefaultShippingInfo.tsx';

interface IProps {
  userDataState: UserInfoState;
  withDelivery: boolean;
  delivery: ReactNode | null;
}

interface UserInfoState {
  state: IUserForProfile;
  setState?: React.Dispatch<React.SetStateAction<IUser>>;
}

const UserInfo: React.FC<IProps> = ({ userDataState, withDelivery = false, delivery }) => {
  const { state, setState } = userDataState;
  return (
    <div className={'flex mb-4'}>
      <div className={'flex flex-col gap-5 mt-4 w-1/2'}>
        <div className={'flex flex-row gap-5 items-center'}>
          <User size={32} weight="fill" />
          <h2 className={'font-bold'}>Personal Information </h2>
          <IsRegistered role={state.roles} />
        </div>
        <div className={'grid grid-cols-2 w-2/3'}>
          <p>Customer`s name </p>
          <span className={'font-bold'}>{state.firstName + ' ' + state.secondName}</span>
          <p>Email </p>
          <span className={'font-bold'}>{state.email}</span>
          <p>Phone Number </p>
          <span className={'font-bold'}>{state.phoneNumber}</span>
        </div>
        <div className={'flex flex-row gap-5 items-center'}>
          <ArrowsHorizontal size={32} weight="fill" />
          <p className={'font-bold'}>Measurement</p>
        </div>
        <div>
          <p>This data has not been entered in the user profile</p>
        </div>
        {withDelivery && (
          <div className={'flex flex-row gap-5 items-center'}>
            <ChatText size={32} weight="fill" />
            <p className={'font-bold'}>Comment</p>
          </div>
        )}
        {withDelivery && (
          <div>
            <p>There are no comments for this customer yet</p>
          </div>
        )}
      </div>

      <div className={'flex flex-col gap-5 mt-4 w-1/2'}>
        <DefaultShippingInfo shippingInfo={state.shippingInfo} />
        {delivery && delivery}
        {!withDelivery && (
          <div>
            <ChatText size={32} weight="fill" />
            <p className={'font-bold'}>Comment</p>
          </div>
        )}
        {!withDelivery && (
          <div>
            <p>There are no comments for this customer yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
