import { Global, ThemeProvider } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { globalStyleBody } from '../components/elements';
import LoginInFormLayover from '../components/LoginFormLayover';
import theme from '../components/theme';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import { OverLayContextProvider } from '../util/context/overlayContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  // Create a new supabase browser client on every first render.
  return (
    <>
      <OverLayContextProvider>
        <CartContextProvider>
          <CartCookieProvider>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyleBody(theme)} />
              <Component {...pageProps} />
              <LoginInFormLayover token={''} />
            </ThemeProvider>
          </CartCookieProvider>
        </CartContextProvider>
      </OverLayContextProvider>
    </>
  );
}

export default MyApp;
