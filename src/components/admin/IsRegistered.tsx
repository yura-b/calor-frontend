import React from 'react';

const IsRegistered: React.FC<{ isUserRegistered: boolean }> = ({ isUserRegistered }) => {
  if (!isUserRegistered)
    return (
      <div className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-neutral-400 text-white'}>
        <span className={'bg-white w-3 h-3 rounded-full'}></span>
        <span>Non-Register</span>
      </div>
    );

  return (
    <div className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-black text-white'}>
      <span className={'bg-white w-3 h-3 rounded-full'}></span>
      <span>Register</span>
    </div>
  );
};

export default IsRegistered;
