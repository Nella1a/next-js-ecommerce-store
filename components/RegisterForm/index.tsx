import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthProvider';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { loginAndRegisterForm } from '../elements';

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
    reset,
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
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            username: data.username,
          }),
        });

        const response = await res.json();

        if ('error' in response) {
          setError({ message: response.error.message });
        } else if (res.status === 201) {
          // registration okay
          setRegisterOkay(true);
          toggleLayover();
          reset();
          setTimeout(() => {
            // console.log('Delayed for 3 second.');
            router.push('/login');
          }, 3000);
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
    <article>
      {registerOkay && (
        <div>
          <p>Your registration was successful.</p>
          <p>You will be forward to the login page.</p>
        </div>
      )}
      <form
        action="/api"
        css={loginAndRegisterForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username">Username</label>
        <input
          {...register('username', {
            required: 'username is required.',
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
          data-test-id="username"
          css={errorStyle(errors.username?.type)}
          placeholder="Username"
          id="username"
        />

        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'email is required.',
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-test-id="userEmail"
          css={errorStyle(errors.email?.type)}
          placeholder="Email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          {...register('password', {
            required: 'password is required.',
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
          data-test-id="password"
          css={errorStyle(errors.password?.type)}
          placeholder="Password"
          type="password"
          id="password"
        />
        <button type="submit">Create Account</button>
      </form>

      {error.message && <div css={apiErrorStyle}>{error.message}</div>}
    </article>
  );
}
