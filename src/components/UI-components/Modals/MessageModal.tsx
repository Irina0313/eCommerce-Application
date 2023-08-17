import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface IMessageModal {
  apiResponse: boolean | null;
  message: string;
  handleCloseModal: (apiResponse: boolean | null) => void;
  showModal: boolean;
}
//Modal
export function MessageModal({ apiResponse, message, handleCloseModal, showModal }: IMessageModal) {
  const handleClose = () => handleCloseModal(apiResponse);

  return (
    <>
      <Dialog open={showModal} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle color={'primary'} fontSize={'1.5rem'}>
          {apiResponse ? 'Success' : 'Error'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal(apiResponse)} color='primary' variant='outlined'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
