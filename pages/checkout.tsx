import Head from 'next/head';
import { useForm } from 'react-hook-form';
import CheckOutForm from '../components/CheckOutForm';
import { flexStyle, formStyle } from '../components/elements';
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
  userMail: '',
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
        <h1>Shipping Information</h1>
        <div>
          <form
            action="/thankyou"
            css={formStyle}
            onSubmit={handleSubmit((values) => {
              console.log('FormValues: ', values);
            })}
          >
            <CheckOutForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              setFocus={setFocus}
            />
            <div>
              <input type="submit" value="Submit" />{' '}
              <button onClick={() => reset()}>clear fields</button>
            </div>
          </form>
        </div>
      </section>
    </LayoutNoHeader>
  );
}
