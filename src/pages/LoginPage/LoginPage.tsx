import React from 'react';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { InputField, IFormInput } from '../../components/UI-components/InputField';

import st from './LoginPage.module.scss';

export function LoginPage() {
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const watchMail: string | undefined = watch('mail', '');
  const { emailErrors, registerMailParams } = useEmailValidation(watchMail as string);
  const watchPassword: string | undefined = watch('password', '');
  const { passwordErrors, registerPasswordParams } = usePasswordValidation(watchPassword as string);
  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={st.formContainer}>
      <h1 className={st.title}>Sign in</h1>
      <h5>Sign in to your account using email and password provided during registration.</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label='E-mail' name='mail' registerParams={registerMailParams} errors={emailErrors} register={register} />

        <InputField label='Password' name='password' registerParams={registerPasswordParams} errors={passwordErrors} register={register} type='password' />

        <input type='submit' value='Sign In' />
      </form>
    </div>
  );
}
