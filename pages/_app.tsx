import { css, Global, ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';
import { getParsedCookie } from '../util/cookies';
import { CartCookieTwo } from './types';

const bodyGreyLayer = (showGrayLayer: any) => css`
  width: 100%;
  height: 100%;
  background-color: rgba(105, 105, 105, 0.6);
  position: absolute;
  z-index: 999;
  display: ${showGrayLayer ? 'block' : 'none'};
  top: 0;
`;

function MyApp({ Component, pageProps }: any) {
  const [showGrayLayer, setShowGrayLayer] = useState(false);
  const [sumOfcart, setSumOfcart] = useState(0);
  const [cookieGlobal, setCookieGlogal] = useState<CartCookieTwo[]>([]);

  useEffect(() => {
    const cookie = getParsedCookie('cart');
    setCookieGlogal(cookie);
  }, [sumOfcart]);

  useEffect(() => {
    if (cookieGlobal?.length) {
      const quantities = cookieGlobal.map((cookie) => cookie.quantity);
      const initialValue = 0;
      const sumOfQuantities = quantities.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );

      setSumOfcart(sumOfQuantities);
    } else {
      setSumOfcart(0);
    }
  }, [cookieGlobal]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyleBody(theme)} />
        <div css={bodyGreyLayer(showGrayLayer)} />
        <Component
          {...pageProps}
          showGrayLayer={showGrayLayer}
          setShowGrayLayer={setShowGrayLayer}
          sumOfcart={sumOfcart}
          setSumOfcart={setSumOfcart}
          setCookieGlogal={setCookieGlogal}
        />
      </ThemeProvider>
      ;
    </>
  );
}

export default MyApp;
