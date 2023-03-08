import Head from 'next/head';
import { Form } from 'react-final-form';
import CheckOutForm from '../components/CheckOutForm';
import LayoutNoHeader from '../components/LayoutNoHeader';
import { disableGrayLayer } from '../hooks';
import { PropsTypeGrayLayer } from './types';

export default function CheckOut({
  showGrayLayer,
  setShowGrayLayer,
}: PropsTypeGrayLayer) {
  disableGrayLayer(showGrayLayer, setShowGrayLayer);
  const onSubmit = () => {};

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
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, values }) => {
            return (
              <CheckOutForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
                values={values}
              />
            );
          }}
        />
      </section>
    </LayoutNoHeader>
  );
}
