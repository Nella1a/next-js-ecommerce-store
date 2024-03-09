type Props = {
  email: string;
  setEmail: (email: string) => void;
};

export default function FormNewsletter({ email, setEmail }: Props) {
  return (
    <article>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          setEmail('');
        }}
      >
        <label htmlFor="user-email">
          Join us!
          <span> Subscribe to our newsletter.</span>
        </label>
        <p>
          <input
            type="email"
            id="user-email"
            name="user-email"
            placeholder="Your Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </p>
        <button type="submit">Sign Up</button>
      </form>
    </article>
  );
}
