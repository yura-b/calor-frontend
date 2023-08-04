import React, { useState } from 'react';

const CustomSearch: React.FC<{ searchButton: (value) => void }> = ({ searchButton }) => {
  const [value, setValue] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative text-black focus-within:text-gray-400 mr-4 my-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button onClick={searchButton} className="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="q"
        value={value}
        onChange={changeHandler}
        className=" py-2 w-full  text-sm text-black bg-custom-grey pl-10 focus:outline-none focus:text-white focus:bg-gray focus:text-gray-900 rounded-none"
        placeholder="Search..."
        autoComplete="off"
      />
    </div>
  );
};

export default CustomSearch;
