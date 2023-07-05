import React from 'react';
import searchIcon from '@assets/images/searchIcon.svg';

const SearchInput: React.FC = (): React.ReactElement => {
  return (
    <div className="relative max-w-sm mx-auto my-0">
      <input
        type="search"
        className="px-8 py-2 pr-1 border border-white  focus:outline-none  focus:ring-mint focus:border-mint w-full text-base placeholder-gray"
        placeholder="Search shoe and Calor products....."
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <img src={searchIcon} alt={''} />
      </span>
    </div>
  );
};

export default SearchInput;
