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
    <div className="flex max-w-lg px-6 py-2.5 text-gray">
      <div className="basis-4/12 ">
        <div className="bg-white flex rounded-full w-24 mt-1">
          <img src={img} />
        </div>
      </div>
      <div className="w-full basis-8/12">
        <p className={`${styles.body1} mb-1`}>{text}</p>
        <Link to="" className="font-bold border-b-2  border-gray mt-10" onClick={handleOpen}>
          Details
        </Link>
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
          <p className={`${styles.body1} basis-1/2`}>$ {price}</p>
          <Button color="transparentGray" className="w-20" onClick={handleClick}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Extras;
