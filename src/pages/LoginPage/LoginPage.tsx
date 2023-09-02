import React, { useEffect, useState } from 'react';
import { LoginForm } from '../../components/UI-components/Forms/LoginForm';
import { useForm } from 'react-hook-form';
import { MessageModal } from '../../components/UI-components/Modals/MessageModal';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../api/Client';
import { setId } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/useAppSelector';
//import { getToken } from '../../api/BuildClient';
interface IFormInput {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const {
    formState: { errors },
  } = useForm<IFormInput>();

  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IFormInput) => {
    if (Object.keys(errors).length === 0 && data.email && data.password) {
      setloading(true);

      userLogin(data.email, data.password)
        .then(({ body }) => {
          setUserId(body.customer.id);
          setApiResponse(true);
          setMessage('Logged in successfully!');
          setShowModal(true);
          setloading(false);
        })
        .catch((e) => {
          setApiResponse(false);
          setloading(false);
          setMessage(e.name === 'BadRequest' ? 'Invalid email or password. Please try again.' : e.message);
          setShowModal(true);
        });
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
      <LoginForm onSubmit={onSubmit} />
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
