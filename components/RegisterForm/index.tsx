import { css } from '@emotion/react';
import { signIn } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';

export const registerStyle = css`
  /* background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0; */
  //width: 50%;
  height: 100%;
  //z-index: 40;
  // margin: 0;

  h1 {
    padding-top: 2.25rem;
    padding-bottom: 1rem;
  }

  > button {
    position: absolute;
    top: 0;
    right: 0.5rem;
    width: 55px;
    height: auto;
    background-color: transparent;
    border: none;
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
    > button {
      width: 100%;
      border-width: 1px;
      width: 100%;
      margin-bottom: 1rem;
      padding: 1.2rem;
      line-height: 1.25rem;
      font-size: 100%;
      margin-top: 0;
      font-weight: unset;
    }
  }
`;

const apiErrorStyle = css`
  padding: 10px 0;
  color: red;
`;

export interface DefaultFormValues {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
}

type Props = {
  token: string;
};

export default function RegisterForm(props: Props) {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const { toggle, toggleLayover } = useContext(OverlayContext);
  const [error, setError] = useState(undefined);
  const [registerOkay, setRegisterOkay] = useState(false);
  const [user, setUser] = useState({
    username: undefined,
    email: undefined,
    id: undefined,
  });

  const onSubmit = async (data: DefaultFormValues) => {
    console.log('----> RegisterForm Values: ', data);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    const response = await res.json();

    if ('error' in response) {
      setError(response.error);
      console.log('response: ', response);
      return null;
    }
    setRegisterOkay(true);
    setUser(response);
    signIn('credentials', {
      ...data,
      callbackUrl: '/',
    });
  };

  return (
    <article css={registerStyle}>
      <h1>Create Your Account </h1>

      <p>
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum lorem
        ipsum lorem.
      </p>
      <form action="/api" css={''} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('username', {
            required: 'username is required.',
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
          data-test-id="username"
          css={errorStyle(errors.username?.type)}
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
          {...register('email', {
            required: 'email is required.',
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-test-id="userEmail"
          css={errorStyle(errors.email?.type)}
          placeholder="Email"
        />

        <button type="submit">Create Account</button>
      </form>
      {error && <div css={apiErrorStyle}>{error}</div>}

      {registerOkay && (
        <>
          Hello USER: {user.username}, {user.email}, {user.id}
        </>
      )}
    </article>
  );
}
