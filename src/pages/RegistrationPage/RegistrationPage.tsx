import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageModal } from '../../components/UI-components/Modals/MessageModal';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../components/UI-components/Forms/RegistrationForm';
import { IFormInput } from '../../helpers/Interfaces.ts/FormsInterfaces';

export function RegistrationPage() {
  const {
    formState: { errors },
  } = useForm<IFormInput>();

  const [apiResponse, setApiResponse] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();

  const onSubmit = (data: IFormInput) => {
    if (Object.keys(errors).length === 0) {
      console.log(JSON.stringify(data));
      const isLoginSuccessful = true; // Это переменная с ответом от API для модалки (пока временно поставила false ручками). В результате тут должен быть вызов некой функции-запроса к API, возвращающей true, если пользователь залогинился или false, если нет.

      //Дальше тут показываем модалку и либо продолаем логиниться, либо перебрасываем на main
      if (isLoginSuccessful) {
        setApiResponse(true);
        setShowModal(true);
        setMessage('Account is created successfully!');
      } else {
        setApiResponse(false);
        setShowModal(true);
        setMessage('Ooops... Something went wrong. Check fields.'); //надо проверить, возможно нужно  будет выводить разные сообщения в зависимости от ответа API
      }
    }
  };
  const handleCloseModal = (apiResponse: boolean | null): void => {
    if (apiResponse !== null) {
      setShowModal(false);
      if (apiResponse) {
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
