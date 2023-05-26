import { css } from '@emotion/react';
import { createContext, useEffect, useState } from 'react';

const bodyGreyLayer = (showGrayLayer: any) => css`
  width: 100%;
  height: 100%;
  background-color: rgba(105, 105, 105, 0.6);
  position: absolute;
  z-index: 999;
  display: ${showGrayLayer ? 'block' : 'none'};
  top: 0;
`;

export const GrayLayerContext = createContext({
  showGrayLayer: false,
  toggleGrayLayer: (toggle: boolean) => {},
});

export const GrayLayerProvider = ({ children }: any) => {
  const [showGrayLayer, setShowGrayLayer] = useState(false);

  const toggleGrayLayer = (toggle: boolean) => setShowGrayLayer(toggle);

  const value = {
    showGrayLayer,
    toggleGrayLayer,
  };

  console.log(showGrayLayer);
  return (
    <GrayLayerContext.Provider value={value}>
      {children}
    </GrayLayerContext.Provider>
  );
};
