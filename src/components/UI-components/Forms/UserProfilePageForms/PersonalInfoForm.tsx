import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { store } from '../../../../store/store';
import * as Client from '../../../../api/Client';
import { Controller } from 'react-hook-form';
import { TitleInput, FirstNameInput, LastNameInput } from '../../../../components/UI-components/Inputs/NameInputs';
import { EmailInput } from '../../../../components/UI-components/Inputs/EmailInput';
import { DateInput } from '../../../../components/UI-components/Inputs/Date';
import { Customer } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ITabPanelProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
//import InputAdornment from '@mui/material/InputAdornment';
//import IconButton from '@mui/material/IconButton';
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import Input from '@mui/material/Input';
//import InputLabel from '@mui/material/InputLabel';
//import FormControl from '@mui/material/FormControl';
import { ChangePasswordModal } from '../../../../components/UI-components/Modals/ChangePasswordModal';
import { IUserInfoFormInput } from '../../../../helpers/Interfaces.ts/FormsInterfaces';

/* interface RegistrationFormProps {
  onSubmit: (data: IUserInfoFormInput) => void;
} */

export function PersonalInfoForm(props: { customerInfo: Customer }) {
  const { customerInfo } = props;
  const {
    watch,
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    //setValue,
    trigger,
  } = useForm<IUserInfoFormInput>();

  const watchFirstName: string | undefined = watch('firstName', customerInfo?.firstName);
  const watchLastName: string | undefined = watch('lastName', customerInfo?.lastName);
  const watchMail: string | undefined = watch('email', customerInfo?.email);
  //const watchPassword: string | undefined = watch('password', '');
  const watchBirthDate: string | undefined = watch('dateOfBirth', '');

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [inputsVariant, setInputsVariant] = useState<'filled' | 'outlined' | 'standard'>('standard');
  const [editPersonalInfoBtmText, setEditPersonalInfoBtmText] = useState('Edit Personal Info');

  const handleEditPersonalInfoBtn = () => {
    if (isReadOnly) {
      setIsReadOnly(false);
      setInputsVariant('outlined');
      setEditPersonalInfoBtmText('Save personal info');
    }
    if (!isReadOnly) {
      setIsReadOnly(true);
      setInputsVariant('standard');
      setEditPersonalInfoBtmText('Edit Personal Info');
    }
  };
  const handleChangePasswordBtn = () => {
    console.log('22');
  };
  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={2} sx={{ display: !customerInfo?.title ? 'none' : 'block' }}>
                <TitleInput readOnly={isReadOnly} />
                <TextField
                  id="title"
                  label="Title: "
                  variant={inputsVariant}
                  defaultValue={customerInfo?.title}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName as string} inputName="firstName" trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>

              <Grid item xs={12} md={4}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName as string} inputName="lastName" trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>
              <Grid item xs={12} md={4}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName="email" trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="outlined" onClick={handleEditPersonalInfoBtn}>
                  {editPersonalInfoBtmText}
                </Button>
                <Button variant="outlined" onClick={handleChangePasswordBtn} sx={{ marginLeft: '20px' }}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
