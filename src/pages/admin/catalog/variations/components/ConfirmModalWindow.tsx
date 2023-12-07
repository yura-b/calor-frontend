import React, {FC} from 'react';
import {Backdrop, Box, Modal, Typography} from '@mui/material';
import {EditVariationElementDto} from '@/api/dto/products.dto.ts';
import CustomButton from '@components/button/CustomButton.tsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
};

interface IProps {
    open: boolean;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: EditVariationElementDto | null;
    handler: (data: EditVariationElementDto) => void;
}

const ModalWindow: FC<IProps> = ({open, closeModal, data, handler}) => {
    const clickHandler = () => {
        if (!data) return;
        handler(data);
        closeModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => closeModal(false)}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <div>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Are you sure you want delete this item from variation?
                    </Typography>
                    <div className="flex flex-wrap gap-8 w-full py-4 justify-end px-8">
                        <CustomButton title={'Close'} handler={() => closeModal(false)}/>
                        <CustomButton title={'Delete'} handler={clickHandler}/>
                    </div>
                </Box>
            </div>
        </Modal>
    );
};

export default ModalWindow;
