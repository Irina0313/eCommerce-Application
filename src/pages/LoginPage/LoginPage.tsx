import React, { useEffect, useState } from 'react';
import { LoginForm } from '../../components/UI-components/Forms/LoginForm';
import { useForm } from 'react-hook-form';
import { MessageModal } from '../../components/UI-components/Modals/MessageModal';
import { useNavigate } from 'react-router-dom';
import { userLogin, getCart, getCarts, createCart } from '../../api/Client';
import { setId } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ICurrentUser } from '../../helpers/Interfaces.ts/FormsInterfaces';
import { create } from 'domain';
import { Cart } from '@commercetools/platform-sdk';
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
  //const [anonymousCart, setAnonymousCart] = useState<Cart | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IFormInput) => {
    if (Object.keys(errors).length === 0 && data.email && data.password) {
      setloading(true);
      userLogin(data.email, data.password)
        .then(async ({ body }) => {
          setUserId(body.customer.id);
          //Проверяем есть ли анонимная корзина и если есть получаем ее
          const user = localStorage.getItem('user');

          const anonymousCartId = user && JSON.parse(user).cartId ? JSON.parse(user).cartId : null;
          const anonymousCart = await getCart(anonymousCartId);
          getCarts().then((resp) => {
            const user: ICurrentUser = { userId: body.customer.id };
            const responce = resp.body;
            const carts = responce.results;
            let isTargetUser = false;
            carts.forEach((cart) => {
              if (anonymousCart === null && cart.customerId === body.customer.id) {
                user.cartId = cart.id;
                localStorage.setItem('user', JSON.stringify(user));
                isTargetUser = true;
              } else if (anonymousCart !== null && cart.customerId === body.customer.id) {
                console.log(anonymousCart); // тут надо объединить данные корзин или что-то еще
              }
            });
            if (!isTargetUser) {
              createCart().then((resp) => {
                const responce = resp.body;
                user.cartId = responce.id;
                localStorage.setItem('user', JSON.stringify(user));
              });
            }
            setApiResponse(true);
            setMessage('Logged in successfully!');
            setShowModal(true);
            setloading(false);
          });
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
