import { useState } from 'react';
import { useFormik } from 'formik';
import searchIcon from '@assets/images/searchIcon.svg';

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
          className={`border-b px-2 py-1 bg-custom-red lg:py-0.5 text-white ${
            isInputFocused || formik.values.searchTerm ? 'px-2' : 'pl-8'
          }  border-[#F09690]  focus:outline-none  focus:ring-lightGray focus:border-lightGray w-full text-base placeholder-[#F09690] lg:text-[12px] `}
          placeholder={!isInputFocused ? 'Search for Calor products' : 'What are you looking for?'}
          value={formik.values.searchTerm}
          onChange={formik.handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ minWidth: '200px' }}
        />
        {!formik.values.searchTerm && !isInputFocused && (
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-1 top-1.5 lg:top-0.5 cursor-pointer w-[16px]"
            onClick={handleSearchIconClick}
          />
        )}
        {(formik.values.searchTerm != '' || isInputFocused) && (
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute right-2 top-1.5 lg:top-0.5 cursor-pointer w-[16px]"
            onClick={handleSearchIconClick}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
