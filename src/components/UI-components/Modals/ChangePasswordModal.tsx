import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { PasswordChangeInput } from '../Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import { IUserPasswordChange } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import { changeCustomerPassword } from '../../../api/Client';
import CircularProgress from '@mui/material/CircularProgress';

interface IModal {
  showModal: boolean;
  customerInfo: Customer;
  handleCloseModal: (close: boolean) => void;
}

export function ChangePasswordModal({ handleCloseModal, showModal, customerInfo }: IModal) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    trigger,
  } = useForm<IUserPasswordChange>();

  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [displayOKBtn, setDisplayOKBtn] = useState('block');
  const [displayCloseBtn, setDisplayCloseBtn] = useState('none');
  const [displayInputs, setDisplayInputs] = useState('flex');

  const watchCurrentPassword: string | undefined = watch('currentPassword', '');
  const watchNewPassword: string | undefined = watch('newPassword', '');

  const handleOKClickBtn = () => {
    setloading(true);

    const userNewPassword: CustomerChangePassword = {
      version: customerInfo.version,
      id: customerInfo.id,
      currentPassword: watchCurrentPassword as string,
      newPassword: watchNewPassword as string,
    };
    changeCustomerPassword(userNewPassword.id, userNewPassword)
      .then(() => {
        setApiResponse(true);
        setMessage('Password was changed successfully!');
        setloading(false);
        setDisplayInputs('none');
        setDisplayOKBtn('none');
        setDisplayCloseBtn('block');
      })
      .catch((e) => {
        setApiResponse(false);
        setloading(false);
        setMessage(e.message);
      });
  };

  const handleClose = () => {
    setDisplayInputs('flex');
    setDisplayOKBtn('block');
    setDisplayCloseBtn('none');
    setMessage('');
    handleCloseModal(true);
  };

  return (
    <>
      <Dialog open={showModal} onClose={handleClose} maxWidth='xs' fullWidth id={'messageModal'}>
        <DialogTitle color={apiResponse || apiResponse === null ? 'primary' : 'error'} fontSize={'1.5rem'}>
          Change password
        </DialogTitle>
        <DialogTitle color={apiResponse ? 'primary' : 'error'} fontSize={'1.4rem'}>
          {apiResponse === null ? '' : message}
        </DialogTitle>
        <DialogContent>
          <PasswordChangeInput control={control} register={register} errors={errors} valueToValidate={watchCurrentPassword as string} inputName='currentPassword' trigger={trigger} variant='outlined' readOnly={false} label='Current password' display={displayInputs} />
          <PasswordChangeInput control={control} register={register} errors={errors} valueToValidate={watchNewPassword as string} inputName='newPassword' trigger={trigger} variant='outlined' readOnly={false} label='New password' display={displayInputs} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOKClickBtn()} color='primary' variant='outlined' data-testid={'messageModalBtn'} sx={{ display: displayOKBtn }}>
            Save
          </Button>
          <Button onClick={() => handleClose()} color='primary' variant='outlined' data-testid={'messageModalBtn'} sx={{ display: displayOKBtn }}>
            Cancel and close
          </Button>
          <Button onClick={() => handleClose()} color='primary' variant='outlined' data-testid={'messageModalBtn'} sx={{ display: displayCloseBtn }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {loading && (
        <CircularProgress
          size={96}
          sx={{
            color: 'blue',
            position: 'absolute',
            top: '40%',
            left: '50%',
          }}
        />
      )}
    </>
  );
}
