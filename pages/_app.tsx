import { Global, ThemeProvider } from '@emotion/react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import { OverLayContextProvider } from '../util/context/overlayContext';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
