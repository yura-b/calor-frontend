import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@components/ui/Button';

interface IProps {
  open: boolean;
  handleClose: (boolean) => void;
  children
}

const CustomModal: FC<IProps> = ({ open, handleClose, children }) => {
  return (
    <>
      <Modal
        className="flex flex-col justify-center items-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex flex-col justify-start items-center bg-white max-w-[800px] sm:w-[90vw] sm:h-auto h-full w-full">
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default CustomModal;