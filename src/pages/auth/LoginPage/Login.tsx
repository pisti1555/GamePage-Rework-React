import css from './Login.module.css';
import axiosInstance from '../../../interceptors/Axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleErrors from '../../../services/ErrorHandler';

import FormGroup from '../../../components/FormGroup/FormGroup';

import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

interface LoginProps {
  login: any
}

export default function Login(props: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      await props.login(username, password);
      navigate('/');
    } catch (e) {
      setErrors(handleErrors(e));
    }
  };

  return(
    <div className={css.authPage}>
      
      <div className={css.leftSide}>
        <h1>Welcome back!</h1>
      </div>

      <div className={css.rightSide}>

        <form onSubmit={submitForm} className={css.loginForm}>
          <h1>Login</h1>
          <FormGroup 
            type='text'
            label='Username'
            id='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <FormGroup 
            type='password'
            label='Password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button type='submit'>Login</button>
        </form>

        <div className={css.linkContainer}>
          <div className={css.row}>
            <p>Forgot password?</p>
            <Link to='/forgot-password'>Reset password</Link>
          </div>
          <div className={css.row}>
            <p>Don't have an account?</p>
            <Link to='/register'>Sign up</Link>  
          </div>
        </div>

        <div className={css.oAuth2Container}>
          <div className={css.orLine}>
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          <div className={css.oAuthMethod}>
            <FaGoogle />
            <p>continue with Google</p>
          </div>
          <div className={css.oAuthMethod}>
            <FaGithub />
            <p>continue with GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}