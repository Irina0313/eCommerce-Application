import React, { useEffect } from 'react';
import { IAddress, IUserChangeAddress } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { StreetChangeInput, CityChangeInput, PostalCodeChangeInput } from '../Inputs/Address/AddressTextInputs';
import { CountryChangeInput } from '../Inputs/Address/CountryInput';
import Grid from '@mui/material/Grid';

interface IModal {
  showModal: boolean;
  address: IAddress;
  modalType: string;
  onSubmit: (data: IUserChangeAddress, modalType: string) => void;
  handleCancelClose: () => void;
}

export function AddressModal({ showModal, address, modalType, onSubmit, handleCancelClose }: IModal) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<IUserChangeAddress>();

  const watchStreet: string = watch('address.streetName', address.streetName);
  const watchCity: string = watch('address.city', address.city);
  const watchCountry: string = watch('address.country', 'USA');
  const watchPostalCode: string = watch('address.postalCode', address.postalCode);

  const handleFormSubmit = (data: IUserChangeAddress) => {
    const formDataWithDefaults: IUserChangeAddress = {
      ...data,
      action: modalType === 'Change' ? 'changeAddress' : 'addAddress',
      addressId: address.id,
    };
    onSubmit(formDataWithDefaults, modalType);
  };
  useEffect(() => {
    trigger('address.postalCode');
  }, [watchCountry, trigger]);
  return (
    <>
      <Dialog open={showModal} component='form' onSubmit={handleSubmit(handleFormSubmit)} fullWidth sx={{ padding: '15px' }}>
        <DialogTitle color='primary' fontSize={'1.5rem'}>
          {`${modalType} address`}
        </DialogTitle>
        <StreetChangeInput control={control} register={register} errors={errors} valueToValidate={watchStreet} trigger={trigger} />
        <CityChangeInput control={control} register={register} errors={errors} valueToValidate={watchCity} trigger={trigger} />

        <Controller
          name='address.country'
          control={control}
          defaultValue='USA'
          render={({ field }) => (
            <CountryChangeInput
              {...field}
              control={control}
              valueToCheck={watchCountry || 'USA'}
              onSelectCountry={(currCountry: string) => {
                field.onChange(currCountry);
                setValue('address.country', currCountry);
              }}
              ref={field.ref}
              trigger={trigger}
            />
          )}
        />
        <PostalCodeChangeInput control={control} register={register} errors={errors} valueToValidate={watchPostalCode} trigger={trigger} currentCountry={watchCountry || 'USA'} />
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '20px 0', justifyContent: 'center' }}>
          <Button type='submit' variant='contained' sx={{ margin: '15px', width: '100px', textAlign: 'center', alignSelf: 'center', display: 'inline' }} disabled={Object.keys(errors).length > 0}>
            Submit
          </Button>

          <Button variant='contained' sx={{ margin: '15px', width: '100px', textAlign: 'center', alignSelf: 'center', display: 'inline' }} onClick={handleCancelClose}>
            Cancel
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}
