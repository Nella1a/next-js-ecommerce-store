import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { registerStyle } from '../RegisterForm';

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

  const { toggleLayover } = useContext(OverlayContext);
  const [error, setError] = useState(undefined);
  const [registerOkay, setRegisterOkay] = useState(false);
  const [user, setUser] = useState({
    username: undefined,
    email: undefined,
    id: undefined,
  });

  const onSubmit = async (data: DefaultFormValues) => {
    console.log('----> LoginForm Values: ', data);

    signIn('credentials', {
      ...data,
      callbackUrl: '/',
    });
  };

  return (
    <div css={registerStyle}>
      <h1>Welcome Back</h1>

      <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum.</p>
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
        />

        <button type="submit">Login</button>
      </form>

      {registerOkay && (
        <>
          Hello USER: {user.username}, {user.email}, {user.id}
        </>
      )}
    </div>
  );
}
