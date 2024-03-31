import { css } from '@emotion/react';
import { btn } from '../elements';

const newsLetterForm = css`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 2rem;
  gap: 0.75rem;

  label {
    font-weight: 600;
  }

  input {
    letter-spacing: 0.031rem;
    line-height: 1.125rem;
    font-size: 0.9rem;
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--color-grey-2);
  }

  button {
    ${btn}
    background-color: var(--color-btn-primary-bg);
    color: var(--text-color);

    &:hover {
      background-color: var(--color-btn-hover);
    }
  }
`;

type Props = {
  email: string;
  setEmail: (email: string) => void;
};

export default function FormNewsletter({ email, setEmail }: Props) {
  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        setEmail('');
      }}
      css={newsLetterForm}
    >
      <label htmlFor="user-email">
        Join us!
        <span> Subscribe to our newsletter.</span>
      </label>

      <input
        type="email"
        id="user-email"
        name="user-email"
        placeholder="Your email address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
