import React, { FC } from 'react';
import { Backdrop, Box, Modal, Typography } from '@mui/material';
import { IBaseProduct } from '@/constants/interfaces/product.ts';
import { EditVariationElementDto } from '@/api/dto/products.dto.ts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
};

interface IProps {
  open: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  items: IBaseProduct[];
  currentId: string | null;
  handler: (data: EditVariationElementDto) => void;
}

const ModalWindow: FC<IProps> = ({ open, closeModal, items, handler, currentId }) => {

  const clickHandler = (productId: string) => {
    if (!currentId) return
    handler({ elementId: productId, variantId: currentId });
    closeModal(false)
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => closeModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <div>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Add to variation
          </Typography>
          {items.length === 0? <p>List is empty</p> :
            items?.map(item => {
              return <div key={item._id} onClick={() => clickHandler(item._id)}>
                <img src={item.photo} alt="" />
                <p>{item.title}</p>
              </div>;
          })}
        </Box>
      </div>
    </Modal>
  );
};

export default ModalWindow;
