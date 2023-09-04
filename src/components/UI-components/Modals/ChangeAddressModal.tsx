import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import { updateCustomerInfo } from '../../../api/Client';
import { StreetChangeInput, CityChangeInput, PostalCodeChangeInput } from '../Inputs/Address/AddressTextInputs';
import { IAddressChangeProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { CountryChangeInput } from '../Inputs/Address/CountryInput';
import { Controller } from 'react-hook-form';
import { Countries } from '../../../hooks/usePostalCodeValidation';
//import Box from '@mui/material/Box';

interface IModal {
  showModal: boolean;
  address: IAddress;
  handleCloseModal: (close: boolean, info: Customer) => void;
  customerInfo: Customer;
  modalType: string;
}

export function AddressModal({ handleCloseModal, showModal, address, customerInfo, modalType }: IModal) {
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<IAddressChangeProps>();
  const [info, setInfo] = useState<Customer>();
  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [displayOKBtn, setDisplayOKBtn] = useState('block');
  const [displayCloseBtn, setDisplayCloseBtn] = useState('none');
  const [displayInputs, setDisplayInputs] = useState('flex');

  const watchStreet: string | undefined = watch('streetName', address.streetName);
  const watchCity: string | undefined = watch('city', address.city);
  const watchCountry: string | undefined = watch(
    'country',
    Object.keys(Countries).find((key) => Countries[key].code === address.country)
  );
  const watchPostalCode: string | undefined = watch('postalCode', address.postalCode);

  useEffect(() => {
    trigger('postalCode');
  }, [watchCountry, trigger]);

  const handleOKClickBtn = async () => {
    //console.log(Object.keys(errors));
    setloading(true);

    const editedAddress: CustomerUpdate = {
      version: customerInfo.version,
      actions: [
        {
          action: modalType === 'Change' ? 'changeAddress' : 'addAddress',
          addressId: modalType === 'Change' ? address.id : '',
          address: {
            streetName: watchStreet,
            postalCode: watchPostalCode,
            city: watchCity,
            country: Countries[watchCountry].code,
          },
        },
      ],
    };
    try {
      const resp = await updateCustomerInfo(customerInfo.id, editedAddress);
      setInfo(resp.body);
      if (modalType === 'Add billing' || modalType === 'Add shipping') {
        const addresses = resp.body['addresses'];
        const newAddress = addresses[addresses.length - 1];
        const addressId: CustomerUpdate = {
          version: resp.body['version'],
          actions: [
            {
              action: modalType === 'Add billing' ? 'addBillingAddressId' : 'addShippingAddressId',
              addressId: newAddress.id,
            },
          ],
        };
        const newInfo = await updateCustomerInfo(customerInfo.id, addressId);
        setInfo(newInfo.body);
      }
      setApiResponse(true);
      setMessage(modalType === 'Change' ? 'Address was changed successfully!' : 'Address was added successfully!');
    } catch (e) {
      setApiResponse(false);
      setloading(false);
      setMessage(e.message);
    }
    setloading(false);
    setDisplayInputs('none');
    setDisplayOKBtn('none');
    setDisplayCloseBtn('block');
  };

  const handleClose = () => {
    setDisplayInputs('flex');
    setDisplayOKBtn('block');
    setDisplayCloseBtn('none');
    setMessage('');

    handleCloseModal(true, info);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOKClickBtn)}>
        <Dialog open={showModal} onClose={handleClose} maxWidth="xs" fullWidth id={'messageModal'}>
          <DialogTitle color={apiResponse || apiResponse === null ? 'primary' : 'error'} fontSize={'1.5rem'}>
            {`${modalType} address`}
          </DialogTitle>
          <DialogTitle color={apiResponse ? 'primary' : 'error'} fontSize={'1.4rem'}>
            {apiResponse === null ? '' : message}
          </DialogTitle>
          <DialogContent>
            <StreetChangeInput control={control} register={register} errors={errors} valueToValidate={watchStreet as string} inputName="streetName" trigger={trigger} variant="outlined" readOnly={false} label="Street" display={displayInputs} value={address.streetName} />
            <CityChangeInput control={control} register={register} errors={errors} valueToValidate={watchCity as string} inputName="city" trigger={trigger} variant="outlined" readOnly={false} label="City" display={displayInputs} />
            <Controller
              name="country"
              control={control}
              defaultValue={watchCountry}
              render={({ field }) => (
                <CountryChangeInput
                  {...field}
                  control={control}
                  register={register}
                  errors={errors}
                  valueToCheck={watchCountry as string}
                  inputName="country"
                  trigger={trigger}
                  variant="outlined"
                  readOnly={false}
                  label="Country"
                  display={displayInputs}
                  onSelectCountry={(currCountry) => {
                    field.onChange(currCountry);
                    setValue('country', currCountry);
                  }}
                  ref={field.ref}
                />
              )}
            />
            <PostalCodeChangeInput control={control} register={register} errors={errors} valueToValidate={watchPostalCode as string} inputName="postalCode" trigger={trigger} variant="outlined" readOnly={false} label="Postal Code" display={displayInputs} currentCountry={watchCountry as string} />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={() => handleOKClickBtn()} color="primary" variant="outlined" data-testid={'messageModalBtn'} sx={{ display: displayOKBtn }} disabled={Object.keys(errors).length > 0}>
              Save
            </Button>
            <Button onClick={() => handleClose()} color="primary" variant="outlined" data-testid={'messageModalBtn'} sx={{ display: displayOKBtn }}>
              Cancel and close
            </Button>
            <Button onClick={() => handleClose()} color="primary" variant="outlined" data-testid={'messageModalBtn'} sx={{ display: displayCloseBtn }}>
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
      </form>
    </>
  );
}
