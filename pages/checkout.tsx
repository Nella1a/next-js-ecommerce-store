import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';
import CheckOutForm from '../components/CheckOutForm';
import { formStyle } from '../components/elements';
import LayoutNoHeader from '../components/LayoutNoHeader';
import { disableGrayLayer } from '../hooks';
import { PropsTypeGrayLayer } from './types';

interface DefaultFormValues {
  userMail: string;
  firstName: string;
  lastName: string;
  street: string;
  country: string;
  postalCode: string;
  city: string;
}

const defaultValues = {
  mail: '',
  firstName: '',
  lastName: '',
  street: '',
  country: '',
  postalCode: '',
  city: '',
};

export default function CheckOut({
  showGrayLayer,
  setShowGrayLayer,
}: PropsTypeGrayLayer) {
  disableGrayLayer(showGrayLayer, setShowGrayLayer);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setError,
    getFieldState,
  } = useForm({ defaultValues });

  return (
    <LayoutNoHeader
      showGrayLayer={showGrayLayer}
      setShowGrayLayer={setShowGrayLayer}
    >
      <Head>
        <title>Checkout</title>
        <meta name="checkout" content="shipping and payment details" />
      </Head>

      <section>
        {' '}
        <h1>Your Details</h1>
        <div>
          <FormProvider
            {...{
              register,
              handleSubmit,
              formState: { errors },
              reset,
              setFocus,
              setError,
              getFieldState,
            }}
          >
            <form
              action="/thankyou"
              css={formStyle}
              onSubmit={handleSubmit((values) => {
                console.log('FormValues: ', values);
              })}
            >
              <CheckOutForm />
              <div>
                <input type="submit" value="Submit" />{' '}
                <button onClick={() => reset()}>clear fields</button>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </LayoutNoHeader>
  );
}
