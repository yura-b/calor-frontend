import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  img: string;
  price: number;
  text: string;
}

const Extras: React.FC<Props> = ({ img, price, text }): React.ReactElement => {
  return (
    <div className="flex max-w-lg px-6 py-2.5 text-darkGray">
      <div className="basis-4/12 ">
        <div className="bg-white flex rounded-full w-24 mt-1">
          <img src={img} />
        </div>
      </div>
      <div className="w-full basis-8/12">
        <p className="text-base mb-1">{text}</p>
        <Link to="/example" className="font-bold border-b-2  border-darkGray mt-10">
          Details
        </Link>
        <div className="flex justify-between mt-4 items-center">
          <p className="text-base ">$ {price}</p>
          <button className=" base-text h-9 w-24 border border-darkGray font-bold">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Extras;
