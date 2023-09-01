import React, { FC } from 'react';

interface IProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  array: string[];
}

// Make Navigation a generic component with two type parameters
const Navigation: FC<IProps> = ({ setState, state, array }) => {
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';
  return (
    <div className={'flex flex-row mb-6'}>
      {array.map((section) => {
        if (section === state) {
          return (
            <div key={state} className={defaultStyles + chosen} onClick={() => setState(section)}>
              {section}
            </div>
          );
        }
        return (
          <div key={section} className={defaultStyles} onClick={() => setState(section)}>
            {section}
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
