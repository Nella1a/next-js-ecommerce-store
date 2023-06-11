import { css, Global, ThemeProvider } from '@emotion/react';
import { useContext } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';
import { CartContextProvider } from '../util/context/cartContext';
import { CartCookieProvider } from '../util/context/cookieContext';
import {
  GrayLayerContext,
  GrayLayerProvider,
} from '../util/context/grayLayerContext';

const bodyGreyLayer = (showGrayLayer: boolean) => css`
  width: 100%;
  height: 100%;
  background-color: rgba(105, 105, 105, 0.6);
  position: absolute;
  z-index: 999;
  display: ${showGrayLayer ? 'block' : 'none'};
  top: 0;
`;

function MyApp({ Component, pageProps }: any) {
  //const [showGrayLayer, setShowGrayLayer] = useState(true);
  const { showGrayLayer } = useContext(GrayLayerContext);
  console.log('grayLayer: ', showGrayLayer);
  return (
    <>
      <CartContextProvider>
        <CartCookieProvider>
          <ThemeProvider theme={theme}>
            <GrayLayerProvider>
              <Global styles={globalStyleBody(theme)} />
              <div css={bodyGreyLayer(showGrayLayer)} />
              <Component {...pageProps} />
            </GrayLayerProvider>
          </ThemeProvider>
        </CartCookieProvider>
      </CartContextProvider>
    </>
  );
}

export default MyApp;
