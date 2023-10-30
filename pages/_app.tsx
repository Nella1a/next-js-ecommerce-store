import { Global, ThemeProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import { OverLayContextProvider } from '../util/context/overlayContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <SessionProvider session={session}>
        <OverLayContextProvider>
          <CartContextProvider>
            <CartCookieProvider>
              <ThemeProvider theme={theme}>
                <Global styles={globalStyleBody(theme)} />
                <Component {...pageProps} />
              </ThemeProvider>
            </CartCookieProvider>
          </CartContextProvider>
        </OverLayContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
