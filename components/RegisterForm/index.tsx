import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthProvider';
import { OverlayContext } from '../../util/context/overlayContext';
import { auth } from '../../util/firebase-config';
import { errorStyle } from '../CheckoutForm/Shipping';

export const loginRegisterFormStyle = css`
  width: 100%;
  h1 {
    padding-top: 2.25rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  p {
    margin-top: unset;
    margin-bottom: 1rem;
    text-align: center;

    a:link,
    a:visited {
      text-decoration: none;
      color: black;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    // border: 1px solid green;
    margin-bottom: 1rem;

    input,
    > button {
      width: 100%;
      border-width: 1px;
      margin-bottom: 1rem;
      padding: 1.2rem;
      line-height: 1.25rem;
      font-size: 100%;
      margin-top: 0;
      font-weight: unset;
    }

    button {
      background-color: #ed943b;
      border: none;
    }
  }
`;

export const apiErrorStyle = css`
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

interface Error {
  message: string | undefined;
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

  const { toggle, toggleLayover } = useContext(OverlayContext);
  const [error, setError] = useState<Error>({ message: undefined });
  const [registerOkay, setRegisterOkay] = useState(false);

  const router = useRouter();
  const { signUp, user, logOut } = useAuth();

  const onSubmit = async (data: DefaultFormValues) => {
    setError({ message: undefined });
    try {
      const userCred = await signUp(data.email, data.password);

      const idToken = await userCred.user.getIdToken();

      if (idToken) {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await res.json();

        if ('error' in response) {
          setError({ message: response.error.message });
        } else if (res.status === 201) {
          // registration okay
          setRegisterOkay(true);
          toggleLayover();
          router.push('/login');
        }
        await logOut();
      } else {
        setError({ message: 'Error during registration.' });
      }
    } catch (error: any) {
      setError({ message: 'Username and/or email already taken.' });
    }
  };

  return (
    <article css={loginRegisterFormStyle}>
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

      {error.message && <div css={apiErrorStyle}>{error.message}</div>}

      {registerOkay && (
        <>
          Hello USER: {user.username}, {user.email}, {user.id}
        </>
      )}
    </article>
  );
}
