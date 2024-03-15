import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthProvider';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { loginRegisterFormStyle } from '../elements';
import { apiErrorStyle } from '../RegisterForm';

export interface DefaultFormValues {
  email: string;
  password: string;
}

interface Error {
  message: string | undefined;
}
export default function LoginForm() {
  const defaultValues = {};
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const { loginLayover, toggleLoginLayover } = useContext(OverlayContext);
  const [error, setError] = useState<Error>({ message: undefined });
  const { logIn, logOut } = useAuth();

  const onSubmit = async (formValues: DefaultFormValues) => {
    setError({ message: undefined });
    try {
      const userCred = await logIn(formValues.email, formValues.password);

      if (userCred) {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await userCred.user.accessToken}`,
          },
        });

        const result = await response.json();

        if ('error' in result) {
          await logOut();
          setError({ message: result.error.message });
          if (result.error.message !== 'Invalid CSRF token') router.push('/');
        }

        if (response.status === 200) {
          loginLayover && toggleLoginLayover();
          router.push('/myaccount');
        }
      }
    } catch (error) {
      setError({ message: 'Invalid email and/or password!' });
    }
  };

  return (
    <article css={loginRegisterFormStyle}>
      <form action="/api" css={''} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: 'Email is required.',
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-test-id="email"
          css={errorStyle(errors.email?.type)}
          placeholder="email"
        />

        <input
          {...register('password', {
            required: 'password is required.',
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
          data-test-id="password"
          css={errorStyle(errors.password?.type)}
          placeholder="password"
          type="password"
        />

        <button type="submit">Login</button>
      </form>
      {error.message && <p css={apiErrorStyle}>{error.message}</p>}
    </article>
  );
}
