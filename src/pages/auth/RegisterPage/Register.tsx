import css from './Register.module.css';
import axiosInstance from '../../../interceptors/Axios';
import { useState } from 'react';
import handleErrors from '../../../services/ErrorHandler';
import { Link, useNavigate } from 'react-router-dom';

import FormGroup from '../../../components/FormGroup/FormGroup';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      const response = await axiosInstance.post('register', {
        firstName,
        lastName,
        email,
        username,
        password,
        passwordConfirm,
      });

      const token = response.data.data.token;
      localStorage.setItem('JWToken', token);
      navigate('/');

    } catch (e) {
      console.log(e);
      
      setErrors(handleErrors(e));
    }
  };

  return(
    <div className={css.authPage}>
      <div className={css.leftSide}>

      </div>
      <div className={css.rightSide}>
        <form onSubmit={submitForm} className={css.registerForm}>
          <h1>Register</h1>
          <FormGroup
            type='text'
            label='First name'
            id='firstName'
            value={firstName}
            placeholder='First name'
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <FormGroup
            type='text'
            label='Last name'
            id='lastName'
            value={lastName}
            placeholder='Last name'
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
          <FormGroup
            type='email'
            label='Email'
            id='email'
            value={email}
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <FormGroup
            type='text'
            label='Username'
            id='username'
            value={username}
            placeholder='Enter a username'
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <FormGroup
            type='password'
            label='Password'
            id='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <FormGroup
            type='password'
            label='Confirm password'
            id='passwordConfirm'
            value={passwordConfirm}
            placeholder='Enter password again'
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={errors.passwordConfirm}
          />
          <button className={css.submitButton} type='submit'>Register</button>
        </form>
        <div className={css.linkContainer}>
          <div className={css.row}>
            <p>Already have an account?</p>
            <Link to='/login'>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}