import React from 'react';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { InputField, InputPassswordField } from '../../components/UI-components/InputFields';
import st from './LoginPage.module.scss';

export interface IFormInput {
  mail?: string;
  password?: string;
}

export function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const watchMail: string | undefined = watch('mail', '');
  const { emailErrors, registerMailParams } = useEmailValidation(watchMail as string);
  const watchPassword: string | undefined = watch('password', '');
  const { passwordErrors, registerPasswordParams } = usePasswordValidation(watchPassword as string);
  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={st.loginPageContainer}>
      <div className={st.formContainer}>
        <h1 className={st.title}>Login</h1>
        <h5>Login to your account using email and password provided during registration.</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField label='E-mail' name='mail' registerParams={registerMailParams} errors={emailErrors} register={register} />
          {errors.mail && emailErrors.length && <p>{emailErrors}</p>}

          <InputPassswordField label='Password' name='password' registerParams={registerPasswordParams} errors={passwordErrors} register={register} type='password' />
          {errors.password && passwordErrors.length > 0 && <p>{passwordErrors}</p>}

          <input type='submit' value='Login' />
        </form>
      </div>
    </div>
  );
}
