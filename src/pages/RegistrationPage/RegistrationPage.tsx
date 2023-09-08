import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageModal } from '../../components/UI-components/Modals/MessageModal';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../components/UI-components/Forms/RegistrationForm';
import { IUserInfoFormInput } from '../../helpers/Interfaces.ts/FormsInterfaces';
import { userRegister } from '../../api/Client';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setId } from '../../store/userSlice';
import CircularProgress from '@mui/material/CircularProgress';

export function RegistrationPage() {
  const {
    formState: { errors },
  } = useForm<IUserInfoFormInput>();

  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IUserInfoFormInput) => {
    if (Object.keys(errors).length === 0) {
      setloading(true);
      userRegister(data)
        .then(({ body }) => {
          setUserId(body.customer.id);
          setApiResponse(true);
          setloading(false);
          setMessage('Account is created successfully!');
          setShowModal(true);
        })
        .catch((e) => {
          setApiResponse(false);
          setloading(false);
          setMessage(e.name === 'BadRequest' ? 'Ooops... Something went wrong: ' + e.message : e.message);
          setShowModal(true);
        });

      //console.log(JSON.stringify(data));
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

  const isLogin = useAppSelector((state) => state.userReducer.id);

  useEffect(() => {
    if (isLogin) navigate('/');
  }, []);
  return (
    <>
      <RegistrationForm onSubmit={onSubmit} />
      <MessageModal apiResponse={apiResponse} message={message} handleCloseModal={handleCloseModal} showModal={showModal} />
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
