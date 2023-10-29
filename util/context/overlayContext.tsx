import { Children, createContext, useState } from 'react';

export const OverlayContext = createContext({
  toggle: false,
  toggleLayover: () => {},
});

export const OverLayContextProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);

  const toggleLayover = () => {
    setToggle(!toggle);
  };

  const value = {
    toggle,
    toggleLayover,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
