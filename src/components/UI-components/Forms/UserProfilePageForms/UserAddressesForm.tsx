import { Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Countries } from '../../../../hooks/usePostalCodeValidation';
import { AddressModal } from '../../Modals/ChangeAddressModal';
import { MessageModal } from '../../Modals/MessageModal';
import { getCustomerInfo, updateCustomerInfo } from '../../../../api/Client';
import TextField from '@mui/material/TextField';
import { IAddress, IUserChangeAddress } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
//import { useForm } from 'react-hook-form';
//import Card from '@mui/material/Card';
//import Grid from '@mui/material/Grid';
///import { CityInput } from '../../Inputs/Address/AddressTextInputs';
//import { Controller } from 'react-hook-form';

export function UserAddressesForm(props: { customerInfo: Customer; addressType: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const customerInfo = props.customerInfo;
  const [currCustomerInfo, setCurrCustomerInfo] = useState<Customer>(customerInfo as Customer);

  const addressType = props.addressType;

  const [idAddressesArr, setIdAddressesArr] = useState(addressType === 'billing' ? currCustomerInfo.billingAddressIds : currCustomerInfo.shippingAddressIds);
  const [addressesArr, setAddressesArr] = useState(currCustomerInfo.addresses as IAddress[]);

  const [targetAddresses, setTargetAddresses] = useState(addressesArr.filter((address) => idAddressesArr?.includes(address.id)));
  const [editedAddress, setEditedAddress] = useState<IAddress>(targetAddresses[0]);

  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState(customerInfo?.defaultBillingAddressId || '');

  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState(customerInfo?.defaultShippingAddressId || '');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [apiResponce, setApiResponce] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  //Add
  const handleAddAddress = () => {
    addressType === 'billing' ? setModalType('Add billing') : setModalType('Add shipping');
    setShowModal(true);
  };
  // Edit
  const handleEditAddress = (address: IAddress) => {
    setModalType('Change');
    setShowModal(true);
    setEditedAddress(address);
  };
  //Delete
  const handleDeleteAddress = async (address: IAddress) => {
    setLoading(true);
    try {
      const resp = await getCustomerInfo(customerInfo.id);
      const currCustomerInfo = resp.body;
      if ((addressType === 'billing' && currCustomerInfo.billingAddressIds && currCustomerInfo.billingAddressIds.length < 2) || (addressType === 'shipping' && currCustomerInfo.shippingAddressIds && currCustomerInfo.shippingAddressIds?.length < 2)) {
        setMessage('At least one address is required!');
        setApiResponce(false);
        setShowMessageModal(true);
      } else {
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
          setCurrCustomerInfo(apiResponce.body);
          setApiResponce(true);
          setLoading(false);
          setMessage('Address was deleted successfully!');
          setShowMessageModal(true);
        }
      }
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      setLoading(false);
    }
  };
  //Set default
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
        setDefaultBillingAddressId(newCustomerInfo.defaultBillingAddressId);
      } else if (addressType === 'shipping' && newCustomerInfo.defaultShippingAddressId) {
        setDefaultShippingAddressId(newCustomerInfo.defaultShippingAddressId);
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
  //Close Modal
  const onSubmit = async (data: IUserChangeAddress) => {
    console.log(data);

    setLoading(true);

    const resp = await getCustomerInfo(customerInfo.id);

    setCurrCustomerInfo(resp.body);

    const updatedCustomerInfo = resp.body;
    const addresses = updatedCustomerInfo['addresses'] as IAddress[];
    await setAddressesArr(addresses);

    await setIdAddressesArr(addressType === 'billing' ? updatedCustomerInfo.billingAddressIds : updatedCustomerInfo.shippingAddressIds);

    const filteredAddresses = addressType === 'billing' ? addresses.filter((address) => resp.body.billingAddressIds?.includes(address.id)) : addresses.filter((address) => resp.body.shippingAddressIds?.includes(address.id));

    await setTargetAddresses(filteredAddresses);

    setLoading(false);
    //setShowMessageModal(false);
    setShowModal(false);
  };

  const handleCanselClose = () => {
    setShowModal(false);
  };

  //Close message modal
  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <>
      <Button variant='outlined' size='small' onClick={() => handleAddAddress()} sx={{ margin: '0 0 20px' }}>
        Add new address
      </Button>

      {targetAddresses.map((address: IAddress /* index: number */) => (
        <Box key={address.id} sx={{ margin: '10px 0' }}>
          <TextField value={`${address.streetName}, ${address.postalCode}, ${address.city}, ${Object.keys(Countries).find((key) => Countries[key].code === address.country)}`} size='small' variant='standard' sx={{ width: '80%' }} />

          <IconButton aria-label='edit' color='primary' onClick={() => handleEditAddress(address)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label='delete' color='primary' onClick={() => handleDeleteAddress(address)}>
            <DeleteIcon />
          </IconButton>
          <Button
            size='small'
            onClick={() => handleSetDefaultAddress(address)}
            sx={{ margin: '0 5px' }}
            variant={defaultBillingAddressId === address.id || defaultShippingAddressId === address.id ? 'outlined' : 'outlined'}
            disabled={defaultBillingAddressId === address.id || defaultShippingAddressId === address.id ? true : false}
          >
            {defaultBillingAddressId === address.id || defaultShippingAddressId === address.id ? 'Default Address' : 'Set as Default'}
          </Button>
        </Box>
      ))}
      <AddressModal onSubmit={onSubmit} address={editedAddress} showModal={showModal} modalType={modalType} handleCanselClose={handleCanselClose} />
      {<MessageModal apiResponse={apiResponce} message={message} handleCloseModal={handleCloseMessageModal} showModal={showMessageModal} />}
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
