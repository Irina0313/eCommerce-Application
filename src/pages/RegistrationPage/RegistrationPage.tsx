import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageModal } from '../../components/UI-components/Modals/MessageModal';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../components/UI-components/Forms/RegistrationForm';
import { IUserInfoFormInput } from '../../helpers/Interfaces.ts/FormsInterfaces';
import { userRegister } from '../../api/Client';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setId } from '../../store/userSlice';

export function RegistrationPage() {
  const {
    formState: { errors },
  } = useForm<IUserInfoFormInput>();

  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IUserInfoFormInput) => {
    if (Object.keys(errors).length === 0) {
      userRegister(data)
        .then(({ body }) => {
          setUserId(body.customer.id);
          setApiResponse(true);
          setShowModal(true);
          setMessage('Account is created successfully!');
        })
        .catch((e) => {
          setApiResponse(false);
          setShowModal(true);
          setMessage(e.name === 'BadRequest' ? 'Ooops... Something went wrong: ' + e.message : 'Network error. Please try again.');
        });

      console.log(JSON.stringify(data));
    }
  };
  const handleCloseModal = (apiResponse: boolean | null): void => {
    if (apiResponse !== null) {
      setShowModal(false);
      if (apiResponse) {
        dispatch(setId(userId));
        navigate('/');
      }
    }
  };

  return (
    <>
      <RegistrationForm onSubmit={onSubmit} />
      <MessageModal apiResponse={apiResponse} message={message} handleCloseModal={handleCloseModal} showModal={showModal} />
    </>
  );
}
