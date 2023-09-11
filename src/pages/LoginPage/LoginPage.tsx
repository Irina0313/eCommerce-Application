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

  const onSubmit = async (data: IFormInput) => {
    if (Object.keys(errors).length === 0 && data.email && data.password) {
      setloading(true);
      let carts: Cart[] = [];
      await getCarts().then((resp) => {
        //console.log(resp.body.results);
        carts = carts.concat(resp.body.results);
      });
      userLogin(data.email, data.password)
        .then(async ({ body }) => {
          setUserId(body.customer.id);
          //Проверяем есть ли анонимная корзина и если есть получаем ее
          const userFromLocaleStorage = localStorage.getItem('user');
          const user: ICurrentUser = userFromLocaleStorage ? JSON.parse(userFromLocaleStorage) : {};
          const anonymousCartId = user && user.cartId ? user.cartId : null;

          let isTargetUser = false;
          // console.log(carts);
          carts.forEach((cart) => {
            console.log('cart.customerId', cart.customerId, 'body.customer.id', body.customer.id);
            if (anonymousCartId === null && cart.customerId === body.customer.id) {
              console.log('anonymousCartId === null', anonymousCartId);
              user.userId = cart.customerId;
              user.cartId = cart.id;
              localStorage.setItem('user', JSON.stringify(user));
              isTargetUser = true;
            } else if (anonymousCartId !== null && cart.customerId === body.customer.id) {
              getCart(anonymousCartId).then((resp) => {
                console.log('anonymousCartId !== null', anonymousCartId);
                console.log(resp.body); // тут надо объединить данные корзин или что-то еще
              });
            }
          });
          if (!isTargetUser) {
            console.log('!isTargetUser', !isTargetUser);
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
          //});
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
