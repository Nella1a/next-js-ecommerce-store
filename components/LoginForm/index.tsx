import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { loginRegisterFormStyle } from '../RegisterForm';

export interface DefaultFormValues {
  email: string;
  password: string;
}
type Props = {
  token: string;
};

export default function LoginForm(props: Props) {
  const defaultValues = {};
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const { toggleLayover, toggleLoginLayover } = useContext(OverlayContext);
  const [error, setError] = useState('');
  const [registerOkay, setRegisterOkay] = useState(false);
  const [user, setUser] = useState({
    username: undefined,
    email: undefined,
    id: undefined,
  });

  const onSubmit = async (formValues: DefaultFormValues) => {
    console.log('----> LoginForm Values: ', formValues);
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
          placeholder="Password"
          type="password"
        />

        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      {registerOkay && (
        <>
          Hello USER: {user.username}, {user.email}, {user.id}
        </>
      )}
    </article>
  );
}
