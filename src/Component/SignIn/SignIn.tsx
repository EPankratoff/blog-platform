import { Link, Redirect, useHistory } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUserLogin } from '../../store/fetchSlice';

import classes from './SignIn.module.scss';

export interface IFieldIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const { loading, error } = useAppSelector((state) => state.fetchReducer);
  const history = useHistory();

  const {
    register,
    formState: { errors, submitCount, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IFieldIn>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (submitCount && !error && !loading && !isSubmitting) {
      history.push('/');
    }
  }, [error, errors, history, isSubmitting, loading, submitCount]);

  const onSubmit: SubmitHandler<IFieldIn> = (data) => {
    dispatch(
      fetchUserLogin({
        user: {
          email: data.email,
          password: data.password,
        },
      })
    );
    reset();
  };
  return token ? (
    <Redirect to="/" />
  ) : (
    <div className={classes['form-wrap']}>
      <form className={classes['form-sign-in']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes['form-sign-in-title']}>Sign In</h2>
        <fieldset className={classes['form-sign-in-inputs']}>
          <label className={classes['form-sign-in-label']}>
            Email address
            <input
              {...register('email', {
                required: 'Поле Email обязательно к заполнению',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Please enter valid email!',
                },
              })}
              placeholder="Email address"
              className={classes['form-sign-in-input']}
              type="email"
            />
          </label>
          {errors.email && (
            <span className={classes['form-sign-in-error']}>{errors.email.message as string}</span>
          )}

          <label className={classes['form-sign-in-label']}>
            Password
            <input
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов',
                },
                pattern: {
                  value: /^(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*\d*)[^\s]{6,40}$/i,
                  message: 'Please enter valid password!',
                },
              })}
              placeholder="Password"
              className={classes['form-sign-in-input']}
              type="password"
            />
          </label>
          {errors.password && (
            <span className={classes['form-sign-in-error']}>
              {errors.password.message as string}
            </span>
          )}
        </fieldset>
        <button className={classes['form-sign-in-button']} type="submit">
          Login
        </button>
        <span className={classes['form-sign-in-span']}>
          Don’t have an account?
          <Link className={classes['form-sign-in-link']} to="/sign-up">
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
}
