import { css, Global, ThemeProvider } from '@emotion/react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global
          styles={globalStyleBody(theme)}
          // styles={css`
          //   /* ************* */
          //   /*    Variables  */
          //   /* ************* */

          //   :root {
          //     --backgroundColor: #e4e8e7;
          //   }

          //   /* ************* */
          //   /*    RESET      */
          //   /* ************* */

          //   /* Reset sizing   */
          //   *,
          //   *::before,
          //   *::after {
          //     box-sizing: border-box;
          //   }

          //   /* Reset margin */
          //   body,
          //   h1,
          //   h2,
          //   h3,
          //   h4,
          //   h5,
          //   p {
          //     margin: 0;
          //   }

          //   /* set up the body */
          //   body {
          //     line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
          //     font-size: 17px;
          //     min-height: 100vh;
          //     width: 100vw;
          //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          //       Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          //       sans-serif;
          //     /* background-color: #e4e8e7; */
          //     background-color: var(--backgroundColor);
          //   }

          //   /* make img easier to work with*/
          //   img {
          //     max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
          //     display: block;
          //   }

          //   /* form elements should have same font as body */
          //   input,
          //   button,
          //   textarea,
          //   select {
          //     font: inherit;
          //     color: grey;
          //   }

          //   section {
          //     max-width: 1200px;
          //     margin: 8rem auto;
          //   }

          //   button {
          //     letter-spacing: 0.5px;
          //     line-height: 18px;
          //     text-transform: uppercase;
          //     font-weight: bold;
          //     font-size: 12px;
          //     display: block;
          //     min-height: 40px;
          //     padding: 10px 16px;
          //     margin: 1rem 0;
          //   }
          // `}
        />
        <Component {...pageProps} />
      </ThemeProvider>
      ;
    </>
  );
}

export default MyApp;
