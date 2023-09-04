/* eslint-disable react/jsx-key */
import { Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
//import AddIcon from '@mui/icons-material/Add';
//import EditIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/DeleteOutlined';
//import SaveIcon from '@mui/icons-material/Save';
//import CancelIcon from '@mui/icons-material/Close';

//import MenuItem from '@mui/material/MenuItem';
import { Countries } from '../../../../hooks/usePostalCodeValidation';
//import { useOneCharacterValidation } from '../../../../hooks/useSimpleStringValidation';
import { AddressModal } from '../../Modals/ChangeAddressModal';
import { MessageModal } from '../../Modals/MessageModal';
import { getCustomerInfo, updateCustomerInfo } from '../../../../api/Client';
import TextField from '@mui/material/TextField';

//const countriesArr = Object.keys(Countries);
/* const countryOptions = countriesArr.map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
)); */
/* const countries = ['USA', 'Canada'];
const randomCountry = () => {
  return randomArrayItem(countries);
}; */
export interface IAddress {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
}

export function UserAddressesForm(props: { customerInfo: Customer; addressType: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const customerInfo = props.customerInfo;
  const addressType = props.addressType;
  const [currCustomerInfo, setCurrCustomerInfo] = useState<Customer>(customerInfo);
  const idAddressesArr = addressType === 'billing' ? (currCustomerInfo.billingAddressIds as string[]) : (customerInfo.shippingAddressIds as string[]);
  const [addressesArr, setAddressesArr] = useState(currCustomerInfo.addresses as IAddress[]);

  const [targetAddresses, setTargetAddresses] = useState(addressesArr.filter((address) => idAddressesArr.includes(address.id)));
  const [editedAddress, setEditedAddress] = useState<IAddress>(targetAddresses[0]);

  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState(customerInfo.defaultBillingAddressId | '');
  console.log('defaultBillingAddressId', defaultBillingAddressId, 'customerInfo', customerInfo);

  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState(customerInfo.defaultShippingAddressId | '');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [apiResponce, setApiResponce] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleAddAddress = () => {
    setModalType('Add billing');
    setShowModal(true);
  };

  const handleEditAddress = (address: IAddress) => {
    setModalType('Change');
    setShowModal(true);
    setEditedAddress(address);
  };

  const handleDeleteAddress = async (address: IAddress) => {
    setLoading(true);
    try {
      const resp = await getCustomerInfo(customerInfo.id);
      const currCustomerInfo = resp.body;
      const deletedAddress: CustomerUpdate = {
        version: currCustomerInfo.version,
        actions: [
          {
            action: 'removeAddress',
            addressId: address.id,
          },
        ],
      };
      const apiResponce = await updateCustomerInfo(customerInfo.id, deletedAddress);

      if (apiResponce) {
        setApiResponce(true);
        setLoading(false);
        setMessage('Address was deleted successfully!');
        setShowMessageModal(true);
      }
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      setLoading(false);
    }
  };

  const handleSetDefaultAddress = async (address: IAddress) => {
    setLoading(true);
    try {
      const resp = await getCustomerInfo(customerInfo.id);
      const currCustomerInfo = resp.body;
      const defaultAddressId: CustomerUpdate = {
        version: currCustomerInfo.version,
        actions: [
          {
            action: addressType === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
            addressId: address.id,
          },
        ],
      };
      const apiResponce = await updateCustomerInfo(customerInfo.id, defaultAddressId);
      const newCustomerInfo = apiResponce.body;

      if (addressType === 'billing' && newCustomerInfo.defaultBillingAddressId) {
        await setDefaultBillingAddressId(newCustomerInfo.defaultBillingAddressId);
      } else if (addressType === 'shipping' && newCustomerInfo.defaultShippingAddressId) {
        await setDefaultShippingAddressId(newCustomerInfo.defaultShippingAddressId);
      }

      if (apiResponce) {
        setApiResponce(true);
        setLoading(false);
        setMessage('Default address was set successfully!');
        setShowMessageModal(true);
      }
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      setLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setLoading(true);
    try {
      const resp = await getCustomerInfo(customerInfo.id);
      console.log('resp', resp);
      const updatedCustomerInfo = resp.body;
      await setCurrCustomerInfo(updatedCustomerInfo);
      await setAddressesArr(updatedCustomerInfo.addresses as IAddress[]);
      await setTargetAddresses(updatedCustomerInfo.addresses.filter((address: IAddress) => idAddressesArr.includes(address.id)));
      setLoading(false);
      setShowMessageModal(false);
      setShowModal(false);
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      setLoading(false);
    }
  };
  console.log('defaultBillingAddressId', defaultBillingAddressId);
  return (
    <>
      <Button variant="outlined" size="small" onClick={() => handleAddAddress()} sx={{ margin: '0 0 20px' }}>
        Add new address
      </Button>

      {targetAddresses.map((address: IAddress) => (
        <Box key={address.id} sx={{ margin: '10px 0' }}>
          <TextField value={`${address.streetName}, ${address.postalCode}, ${address.city}, ${Object.keys(Countries).find((key) => Countries[key].code === address.country)}`} size="small" variant="standard" sx={{ width: '80%' }} />
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditAddress(address)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="primary" onClick={() => handleDeleteAddress(address)}>
            <DeleteIcon />
          </IconButton>
          <Button size="small" onClick={() => handleSetDefaultAddress(address)} sx={{ margin: '0 5px' }} variant={defaultBillingAddressId === address.id || defaultShippingAddressId === address.id ? 'contained' : 'outlined'}>
            {defaultBillingAddressId === address.id || defaultShippingAddressId === address.id ? 'Default Address' : 'Set as Default'}
          </Button>
        </Box>
      ))}
      <AddressModal handleCloseModal={handleCloseModal} address={editedAddress} showModal={showModal} customerInfo={currCustomerInfo} modalType={modalType} />
      <MessageModal apiResponse={apiResponce} message={message} handleCloseModal={handleCloseModal} showModal={showMessageModal} />
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
