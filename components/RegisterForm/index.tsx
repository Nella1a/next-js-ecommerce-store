import { css } from '@emotion/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { errorStyle } from '../CheckoutForm/Shipping';
import LayoutNoHeader from '../Layout/LayoutNoHeader';

const registerStyle = css`
  background-color: lightgray;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 518px;
  padding: 0 40px;
  height: 100vh;
  z-index: 10;
  margin: 0;

  h1 {
    padding-top: 2.25rem;
    padding-bottom: 1rem;
  }

  p {
    margin-top: unset;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    margin-bottom: 2rem;

    input,
    button {
      width: 100%;
      border-width: 1px;
      width: 100%;
      margin-bottom: 1rem;
      padding: 1.2rem;
      line-height: 1.25rem;
      font-size: 100%;
    }

    button {
      margin-top: 0;
      font-weight: unset;
    }
  }
`;

export interface DefaultFormValues {
  userEmail: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}

export default function RegisterForm() {
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
        <p>
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum
          lorem ipsum lorem.
        </p>
        <form action="/api" css={''} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('userName', {
              required: 'username is required.',
            })}
            aria-invalid={errors.userName ? 'true' : 'false'}
            data-test-id="userName"
            css={errorStyle(errors.userName?.type)}
            placeholder="Username"
          />

          <input
            {...register('password', {
              required: 'password is required.',
            })}
            aria-invalid={errors.password ? 'true' : 'false'}
            data-test-id="password"
            css={errorStyle(errors.password?.type)}
            placeholder="Password"
          />

          <input
            {...register('userEmail', {
              required: 'email is required.',
            })}
            aria-invalid={errors.userEmail ? 'true' : 'false'}
            data-test-id="userEmail"
            css={errorStyle(errors.userEmail?.type)}
            placeholder="Email"
          />

          <button type="submit">Create Account</button>
        </form>
        <div>
          Already have an account?{' '}
          <Link href="#">
            <span>Log in</span>{' '}
          </Link>
        </div>
      </section>
    </LayoutNoHeader>
  );
}
