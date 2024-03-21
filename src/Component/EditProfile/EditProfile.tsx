import { SubmitHandler, useForm } from 'react-hook-form';

import classes from './EditProfile.module.scss';

export interface IFieldEdit {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export default function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFieldEdit>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFieldEdit> = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <div className={classes['form-wrap']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['form-edit-profile']}>
        <h2 className={classes['form-edit-profile-title']}>Edit Profile</h2>
        <fieldset className={classes['form-edit-profile-inputs']}>
          <label className={classes['form-edit-profile-label']}>
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

                pattern: {
                  value: /^[a-z0-9_-]{3,20}$/,
                  message: 'Please enter valid username!',
                },
              })}
              placeholder="Username"
              className={classes['form-edit-profile-input']}
              type="text"
            />
          </label>

          {errors.username && (
            <span className={classes['form-edit-profile-error']}>
              {errors.username.message as string}
            </span>
          )}

          <label className={classes['form-edit-profile-label']}>
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
              className={classes['form-edit-profile-input']}
              type="email"
            />
          </label>
          {errors.email && (
            <span className={classes['form-edit-profile-error']}>
              {errors.email.message as string}
            </span>
          )}

          <label className={classes['form-edit-profile-label']}>
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
              placeholder="New password"
              className={classes['form-edit-profile-input']}
              type="password"
            />
          </label>
          {errors.password && (
            <span className={classes['form-edit-profile-error']}>
              {errors.password.message as string}
            </span>
          )}

          <label className={classes['form-edit-profile-label']}>
            Avatar image(url)
            <input
              {...register('avatar', {})}
              placeholder="Avatar image"
              className={classes['form-edit-profile-input']}
              type="url"
            />
          </label>
          {errors.avatar && (
            <span className={classes['form-edit-profile-error']}>
              {errors.avatar.message as string}
            </span>
          )}
        </fieldset>
        <button className={classes['form-edit-profile-button']} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
