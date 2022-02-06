import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          html,
          body {
            box-sizing: border-box;
          }

          html,
          body {
            font-size: 17px;
            margin: 0;
            height: 100%;
            width: 100vw;

            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background-color: #eee;
          }

          section {
            max-width: 1400px;
            margin: 48px auto;
          }

          h1,
          h2,
          h3,
          p {
            margin: 0;
          }
        `}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
