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

interface IModal {
  showModal: boolean;
  address: IAddress;
  handleCloseModal: (close: boolean) => void;
  customerInfo: Customer;
  modalType: string;
}

export function AddressModal({ handleCloseModal, showModal, address, customerInfo, modalType }: IModal) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<IAddressChangeProps>();
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
      if (modalType === 'Add billing' || modalType === 'Add shipping') {
        const addresses = resp.body['addresses'];
        const newAddress = addresses[addresses.length - 1];
        const billingAddressId: CustomerUpdate = {
          version: resp.body['version'],
          actions: [
            {
              action: modalType === 'Add billing' ? 'addBillingAddressId' : 'addShippingAddressId',
              addressId: newAddress.id,
            },
          ],
        };
        await updateCustomerInfo(customerInfo.id, billingAddressId);
        setApiResponse(true);
        setMessage(modalType === 'Change' ? 'Address was changed successfully!' : 'Address was added successfully!');
        setloading(false);
        setDisplayInputs('none');
        setDisplayOKBtn('none');
        setDisplayCloseBtn('block');
      } else {
        setApiResponse(true);
        setMessage(modalType === 'Change' ? 'Address was changed successfully!' : 'Address was added successfully!');
        setloading(false);
        setDisplayInputs('none');
        setDisplayOKBtn('none');
        setDisplayCloseBtn('block');
      }
    } catch (e) {
      setApiResponse(false);
      setloading(false);
      setMessage(e.message);
    }
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
          <Button onClick={() => handleOKClickBtn()} color="primary" variant="outlined" data-testid={'messageModalBtn'} sx={{ display: displayOKBtn }}>
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
    </>
  );
}
