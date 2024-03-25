import React, { useState } from 'react';
import TextField from '../molecules/TextField';
import './../../styles/Organisms.css';
import Submit from '../Atoms/Submit';
import { useUser } from '../../contexts/UserContext';

export interface loginInformation {
  email: string;
  password: string;
}

interface loginInformationError {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const emptyLoginInfo: loginInformation = { email: '', password: '' };
  const emptyLoginInfoError: loginInformationError = {
    email: '',
    password: '',
  };

  const [loginInfo, setLoginInfo] = useState<loginInformation>(emptyLoginInfo);
  const [loginInfoError, setLoginInfoError] =
    useState<loginInformationError>(emptyLoginInfoError);

  const { signIn } = useUser();

  const checkForEmail = (): boolean => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (loginInfo.email === '') {
      setLoginInfoError((prev) => ({
        ...prev,
        email: 'You need to provide an email',
      }));
      return false;
    } else if (!regex.test(loginInfo.email)) {
      setLoginInfoError((prev) => ({
        ...prev,
        email: 'Provide a valid email',
      }));
      return false;
    } else {
      setLoginInfoError((prev) => ({ ...prev, email: '' }));
      return true;
    }
  };

  const checkForPassword = (): boolean => {
    if (loginInfo.password === '') {
      setLoginInfoError((prev) => ({
        ...prev,
        password: 'You need to provide a password',
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoginInfoError(emptyLoginInfoError);

    const isPasswordCorrect = checkForPassword();
    const isEmailCorrect = checkForEmail();

    if (!isPasswordCorrect || !isEmailCorrect) {
      return;
    }

    try {
      await signIn(loginInfo);
    } catch (error) {
      console.log(error);
      console.log('No cos nie pyklo');
    }

    //navigate here to homepage
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      style={{ width: 300 }}
    >
      <div className="loginForm">
        <TextField
          label="Email"
          onChange={(e) =>
            setLoginInfo((prev) => ({
              ...prev,
              email: e.target.value.trim(),
            }))
          }
          value={loginInfo.email}
          errorMessage={loginInfoError.email}
        />
        <TextField
          label="Password"
          onChange={(e) =>
            setLoginInfo((prev) => ({
              ...prev,
              password: e.target.value.trim(),
            }))
          }
          value={loginInfo.password}
          errorMessage={loginInfoError.password}
          type="password"
        />
        <Submit label="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
