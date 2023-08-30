import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface IModal {
  apiResponse: boolean | null;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  handleCloseModal: (apiResponse: boolean | null) => void;
  showModal: boolean;
}

export function ChangePasswordModal({ apiResponse, title, firstName, lastName, email, handleCloseModal, showModal }: IModal) {
  const handleClose = () => handleCloseModal(apiResponse);

  return (
    <>
      <Dialog open={showModal} onClose={handleClose} maxWidth="xs" fullWidth id={'messageModal'}>
        <DialogTitle color={apiResponse ? 'primary' : 'error'} fontSize={'1.5rem'}>
          {apiResponse ? 'Edit Personal Info' : 'Error'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{firstName}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal(apiResponse)} color="primary" variant="outlined" data-testid={'messageModalBtn'}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
