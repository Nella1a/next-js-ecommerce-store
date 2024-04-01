import { Global } from '@emotion/react';
import { AuthContextProvider } from '../AuthProvider';
import { globalStyleBody } from '../components/elements';
import LoginInFormLayover from '../components/LoginFormLayover';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import { OverLayContextProvider } from '../util/context/overlayContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  // Create a new supabase browser client on every first render.
  return (
    <>
      <AuthContextProvider>
        <OverLayContextProvider>
          <CartContextProvider>
            <CartCookieProvider>
              <Global styles={globalStyleBody} />
              <Component {...pageProps} />
              <LoginInFormLayover token={''} />
            </CartCookieProvider>
          </CartContextProvider>
        </OverLayContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
