import { css } from '@emotion/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  //console.log('ENV: ', process.config());

  const { toggle, toggleLayover } = useContext(OverlayContext);
  const [error, setError] = useState(undefined);
  const [registerOkay, setRegisterOkay] = useState(false);
  const [user, setUser] = useState({
    username: undefined,
    email: undefined,
    id: undefined,
  });
  const router = useRouter();

  const onSubmit = async (data: DefaultFormValues) => {
    console.log('----> RegisterForm Values: ', data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      // Signed up firebase
      .then(async (userCredential) => {
        // send token to backend
        const user = userCredential.user;
        console.log('user: ', user);

        fetch('/api/register', {
          method: 'POST',
          headers: {
            Authorization: await user.getIdToken(),
          },
        }).then((response) => {
          if (response.status === 200) {
            setRegisterOkay(true);
            router.push('/pages/account');
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    // const res = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ...data }),
    // });

    // const response = await res.json();

    // if ('error' in response) {
    //   setError(response.error);
    //   console.log('response: ', response);
    //   return null;
    // }
    // setRegisterOkay(true);
    // setUser(response);
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

      {error && <div css={apiErrorStyle}>{error}</div>}

      {registerOkay && (
        <>
          Hello USER: {user.username}, {user.email}, {user.id}
        </>
      )}
    </article>
  );
}
