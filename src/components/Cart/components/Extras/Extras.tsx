import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { Modal } from '@mui/material';
interface Props {
  name: string;
  img: string;
  price: number;
  text: string;
}

const Extras: React.FC<Props> = ({ name, img, price, text }): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex  px-6 py-2.5 text-gray lg:flex-col">
      <div className="basis-[30%] ">
        <div className=" flex w-auto">
          <img
            src={img}
            className="object-contain object-cover w-[140px] sm:w-[160px] h-auto lg:mx-auto lg:w-[180px]"
          />
        </div>
      </div>
      <div className="w-full basis-[70%]">
        <p className={`${styles.body1} mb-1 lg:text-[16px]`}>{text}</p>
        <div className="lg:flex lg:justify-between">
          <Link to="" className="font-bold underline text-mint lg:text-gray mt-10 lg:mt-0" onClick={handleOpen}>
            Details
          </Link>
          <p className={`${styles.body1} hidden lg:block lg:text-[16px] lg:font-bold`}>$ {price}</p>
        </div>
        <Modal className="flex items-center justify-center" open={open} onClose={handleClose}>
          <div className="bg-white p-4 shadow-lg w-full md:w-1/2">
            <h2 className={`${styles.header2} mb-4 text-center`}>{name}</h2>
            <div className="bg-white flex rounded-full w-24 mt-1">
              <img src={img} />
            </div>
            <Button onClick={handleClose} color="transparentGray" className="w-20">
              Close
            </Button>
          </div>
        </Modal>
        <div className="flex justify-between mt-4 items-center">
          <p className={`${styles.body1} basis-1/2 lg:hidden`}>$ {price}</p>
          <Button color="transparentGray" className="w-20" onClick={handleClick}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Extras;
