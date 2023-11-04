import { Global, ThemeProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { useContext } from 'react';
import { globalStyleBody } from '../components/elements';
import LoginInFormLayover from '../components/LoginFormLayover';
import theme from '../components/theme';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import {
  OverlayContext,
  OverLayContextProvider,
} from '../util/context/overlayContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const { loginLayover } = useContext(OverlayContext);
  console.log('loginLayover: ', loginLayover);
  return (
    <>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </>
  );
}

export default MyApp;
