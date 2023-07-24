import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { closeDialog } from '@/store/reducers/DialogReducer.ts';
import { createTheme, ThemeProvider } from '@mui/material';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#1EC1AA', // Your desired primary color
    },
  },
});

const SubmitDialog = () => {
  const { closeHandler, title, submitHandler, description, isOpen } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    submitHandler();

    dispatch(closeDialog());
  };

  const handleClose = () => {
    closeHandler && closeHandler();

    dispatch(closeDialog());
  };
  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{description && <Typography gutterBottom>{description}</Typography>}</DialogContent>
      <DialogActions>
        <ThemeProvider theme={buttonTheme}>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </ThemeProvider>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SubmitDialog;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(8),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 8, py: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
