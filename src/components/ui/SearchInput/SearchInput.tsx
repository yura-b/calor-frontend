import React, { FormEvent, useState } from 'react';
import { useFormik } from 'formik';
import searchIcon from '@assets/images/searchIcon.svg'; // Replace with the path to your search icon image

const SearchInput = () => {
  const initialValues = { searchTerm: '' };

  const onSubmit = (values: { searchTerm: string }) => {
    console.log('Searching for:', values.searchTerm);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const [isInputFocused, setInputFocused] = useState(false);

  const handleSearchIconClick = () => {
    formik.handleSubmit();
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="relative flex w-full">
      <div className="relative w-full">
        <input
          type="text"
          name="searchTerm"
          className={`border p-2 bg-lightGray min-w-300px ${
            isInputFocused || formik.values.searchTerm ? 'pl-4 pr-10' : 'pl-8'
          }  border-white  focus:outline-none  focus:ring-lightGray focus:border-lightGray w-full text-base placeholder-gray`}
          placeholder={!isInputFocused ? 'Search shoe and Calor products...' : 'What are you looking for?'}
          value={formik.values.searchTerm}
          onChange={formik.handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ minWidth: '286px' }}
        />
        {!formik.values.searchTerm && !isInputFocused && (
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-2 top-2 cursor-pointer"
            onClick={handleSearchIconClick}
          />
        )}
        {(formik.values.searchTerm != '' || isInputFocused) && (
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute right-4 top-2 cursor-pointer"
            onClick={handleSearchIconClick}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
