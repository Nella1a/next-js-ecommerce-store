import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { errorStyle } from '../CheckoutForm/Shipping';
import LayoutNoHeader from '../Layout/LayoutNoHeader';

const registerStyle = css`
  background-color: lightgray;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 450px;
  padding: 0 36px;
  height: 100vh;
  z-index: 10;
  margin: 0;
`;

export interface DefaultFormValues {
  userEmail: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}

export default function Register() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const onSubmit = (data: DefaultFormValues): void => {
    console.log('----> Form Values: ', data);
  };

  return (
    <LayoutNoHeader>
      <section css={registerStyle}>
        <h1>Create Your SheLovesPlants Account </h1>
        <form action="/api" css={''} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              {...register('userName', {
                required: 'username is required.',
              })}
              aria-invalid={errors.userName ? 'true' : 'false'}
              data-test-id="userName"
              css={errorStyle(errors.userName?.type)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: 'password is required.',
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              data-test-id="password"
              css={errorStyle(errors.password?.type)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register('userEmail', {
                required: 'email is required.',
              })}
              aria-invalid={errors.userEmail ? 'true' : 'false'}
              data-test-id="userEmail"
              css={errorStyle(errors.userEmail?.type)}
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </section>
    </LayoutNoHeader>
  );
}
