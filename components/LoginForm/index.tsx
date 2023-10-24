import Link from 'next/link';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { OverlayContext } from '../../util/context/overlayContext';
import { errorStyle } from '../CheckoutForm/Shipping';
import { registerStyle } from '../RegisterForm';

export interface DefaultFormValues {
  userEmail: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}

export default function LoginForm() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    getFieldState,
    trigger,
  } = useForm<DefaultFormValues>({ defaultValues });

  const { toggleLogin, toggleLoginLayover, toggleLayover } =
    useContext(OverlayContext);

  const onSubmit = (data: DefaultFormValues): void => {
    console.log('----> LoginForm Values: ', data);
  };

  const onClickHandler = () => {
    toggleLoginLayover();
  };

  const onClickRegisterFormHandler = () => toggleLayover();

  return (
    <section css={registerStyle(toggleLogin)}>
      <div>
        <h1>Welcome Back</h1>
        <button type="button" onClick={onClickHandler}>
          <img src="/closeIcon.svg" alt="close overlay icon" />
        </button>
        <p>
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum.
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

          <button type="submit">Login</button>
        </form>
        <div>
          New Here?
          <button type="button" onClick={onClickRegisterFormHandler}>
            <span> Create an Account</span>
          </button>
        </div>
      </div>
    </section>
  );
}
