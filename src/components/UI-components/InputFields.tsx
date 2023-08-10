import React, { useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import st from '../../pages/LoginPage/LoginPage.module.scss';

export interface IFormInput {
  mail?: string;
  password?: string;
  firstName?: string;
}

interface InputFieldProps {
  label: string;
  name: keyof IFormInput;
  registerParams: RegisterOptions;
  errors: string[];
  register: UseFormRegister<IFormInput>;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, registerParams, register, type = 'text' }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name, registerParams)} />
    </div>
  );
};

export const InputPassswordField: React.FC<InputFieldProps> = ({ label, name, registerParams, register, type = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [togglePasswordClasses, setTogglePasswordClasses] = useState(`${st.passwordHidden}`);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (togglePasswordClasses === `${st.passwordVisible}`) {
      setTogglePasswordClasses(`${st.passwordHidden}`);
    } else {
      setTogglePasswordClasses(`${st.passwordVisible}`);
    }
  };
  return (
    <div>
      <label>{label}</label>
      <div className={st.passwordContainer}>
        <input type={showPassword ? 'text' : type} {...register(name, registerParams)} />
        {type === 'password' && <span className={`${st.passwordToggler} ${togglePasswordClasses}`} onClick={togglePasswordVisibility}></span>}
      </div>
    </div>
  );
};
