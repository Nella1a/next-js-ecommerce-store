import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthProvider';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { loginRegisterFormStyle } from '../elements';

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
          type="password"
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
