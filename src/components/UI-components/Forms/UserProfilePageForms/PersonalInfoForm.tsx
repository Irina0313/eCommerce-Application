import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TitleInput, FirstNameInput, LastNameInput } from '../../../../components/UI-components/Inputs/NameInputs';
import { EmailInput } from '../../../../components/UI-components/Inputs/EmailInput';
import { DateInput } from '../../../../components/UI-components/Inputs/Date';
import { getCustomerInfo } from '../../../../api/Client';
import { Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { IUserInfoFormInput } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
import { updateCustomerInfo } from '../../../../api/Client';
import { ChangePasswordModal } from '../../Modals/ChangePasswordModal';
import CircularProgress from '@mui/material/CircularProgress';

export function PersonalInfoForm(props: { customerInfo: Customer }) {
  const [loading, setloading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const customerInfo = props.customerInfo;
  const [currCustomerInfo, setCurrCustomerInfo] = useState<Customer>(customerInfo);

  const {
    watch,
    register,
    control,
    formState: { errors },
    trigger,
  } = useForm<IUserInfoFormInput>();
  const watchTitle: string | undefined = watch('title', customerInfo?.title ? customerInfo?.title : 'Mr');
  const watchFirstName: string | undefined = watch('firstName', customerInfo?.firstName);
  const watchLastName: string | undefined = watch('lastName', customerInfo?.lastName);
  const watchMail: string | undefined = watch('email', customerInfo?.email);
  const watchBirthDate: string | undefined = watch('dateOfBirth', customerInfo?.dateOfBirth);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [inputsVariant, setInputsVariant] = useState<'filled' | 'outlined' | 'standard'>('standard');
  const [editPersonalInfoBtmText, setEditPersonalInfoBtmText] = useState('Edit Personal Info');
  const userNewInfo: CustomerUpdate = {
    version: customerInfo.version,
    actions: [
      {
        action: 'setTitle',
        title: watchTitle,
      },
      {
        action: 'setFirstName',
        firstName: watchFirstName,
      },
      {
        action: 'setLastName',
        lastName: watchLastName,
      },
      {
        action: 'changeEmail',
        email: watchMail,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: watchBirthDate,
      },
    ],
  };
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
      updateCustomerInfo(customerInfo.id, userNewInfo);
    }
  };
  const handleChangePasswordBtn = async () => {
    setloading(true);
    customerInfo;
    async function fetchCustomerInfo() {
      if (customerInfo) {
        try {
          const apiResponse = await getCustomerInfo(customerInfo.id);
          setCurrCustomerInfo(apiResponse.body);
        } catch (error) {
          console.error(error);
        }
      }
    }
    await fetchCustomerInfo();
    setShowModal(true);
    setloading(false);
  };

  const handleCloseModal = (close: boolean) => {
    if (close) {
      setShowModal(false);
    }
  };
  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={2} sx={{ display: !customerInfo?.title ? 'none' : 'block' }}>
                <Controller
                  name='title'
                  control={control}
                  defaultValue={watchTitle}
                  render={({ field }) => (
                    <TitleInput
                      {...field}
                      readOnly={isReadOnly}
                      variant={inputsVariant}
                      trigger={trigger}
                      valueToValidate={watchTitle as string}
                      inputName='title'
                      control={control}
                      onSelectTitle={(currTitle: string) => {
                        field.onChange(currTitle);
                      }}
                      ref={field.ref}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName as string} inputName='firstName' trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>

              <Grid item xs={12} md={4}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName as string} inputName='lastName' trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>
              <Grid item xs={12} md={4}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName='email' trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateInput control={control} register={register} errors={errors} valueToValidate={watchBirthDate as string} inputName='dateOfBirth' trigger={trigger} readOnly={isReadOnly} variant={inputsVariant} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant='outlined' onClick={handleEditPersonalInfoBtn}>
                  {editPersonalInfoBtmText}
                </Button>
                <Button variant='outlined' onClick={handleChangePasswordBtn} sx={{ marginLeft: '20px' }}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <ChangePasswordModal showModal={showModal} handleCloseModal={handleCloseModal} customerInfo={currCustomerInfo} />
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
