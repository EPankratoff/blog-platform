import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classes from './SignUp.module.scss';

export default function SignUp() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: unknown) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <div className={classes['form-wrap']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['form-sign-up']}>
        <h2 className={classes['form-sign-up-title']}>Create new account</h2>
        <label className={classes['form-sign-up-label']}>
          Username
          <input
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })}
            placeholder="Username"
            className={classes['form-sign-up-input']}
            type="text"
          />
        </label>

        {errors.username && <span>{errors.username.message as string}</span>}

        <label className={classes['form-sign-up-label']}>
          Email address
          <input
            {...register('email', {
              required: 'Поле обязательно к заполнению',
            })}
            placeholder="Email address"
            className={classes['form-sign-up-input']}
            type="email"
          />
        </label>
        <label className={classes['form-sign-up-label']}>
          Password
          <input placeholder="Password" className={classes['form-sign-up-input']} type="password" />
        </label>
        <label className={classes['form-sign-up-label']}>
          Repeat Password
          <input placeholder="Password" className={classes['form-sign-up-input']} type="password" />
        </label>

        <label className={classes['form-sign-up-checkbox']}>
          <input className={classes['form-sign-up-checkbox-input']} type="checkbox" />
          <span className={classes['form-sign-up-checkbox-text']}>
            I agree to the processing of my personal information
          </span>
        </label>
        <button className={classes['form-sign-up-button']} type="submit" disabled={!isValid}>
          Create
        </button>
        <span className={classes['form-sign-up-span']}>
          Already have an account?
          <Link className={classes['form-sign-up-link']} to="/sign-in">
            {' '}
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
}
