import React from 'react';

const IsRegistered: React.FC<{ isUserRegistered: boolean }> = ({ isUserRegistered }) => {
  console.log(isUserRegistered);
  if (!isUserRegistered)
    return (
      <div className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-neutral-400 text-white'}>
        <div className={'bg-white w-3 h-3 rounded-full'}></div>
        <p>Non-Register</p>
      </div>
    );

  return (
    <div className={'flex flex-row items-center gap-5 py-2 px-4 rounded-full bg-black text-white'}>
      <div className={'bg-white w-3 h-3 rounded-full'}></div>
      <p>Register</p>
    </div>
  );
};

export default IsRegistered;
