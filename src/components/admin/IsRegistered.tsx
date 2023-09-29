import React from 'react';
import { Role } from '@/constants/enums/role.enum.ts';

const IsRegistered: React.FC<{ role: Role | Role[] }> = ({ role }) => {

  if (role === Role.DELETED) {
    return (
      <span className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-red-500 text-white'}>
        <span className={'bg-white w-3 h-3 rounded-full'}></span>
        <span>DELETED</span>
      </span>
    );
  }

  if (role?.includes(Role.GUEST) || role === Role.GUEST) {
    return (
      <span className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-neutral-400 text-white'}>
        <span className={'bg-white w-3 h-3 rounded-full'}></span>
        <span>Non-Register</span>
      </span>
    );
  }
  return (
    <span className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-black text-white'}>
      <span className={'bg-white w-3 h-3 rounded-full'}></span>
      <span>Register</span>
    </span>
  );
};

export default IsRegistered;
