import { Children, createContext, useState } from 'react';

export const OverlayContext = createContext({
  toggle: false,
  toggleLayover: () => {},
  loginLayover: false,
  toggleLoginLayover: () => {},
});

export const OverLayContextProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);

  const [loginLayover, setLoginLayover] = useState(false);

  const toggleLayover = () => {
    setToggle(!toggle);
  };

  const toggleLoginLayover = () => {
    setLoginLayover(!loginLayover);
  };
  const value = {
    toggle,
    toggleLayover,
    loginLayover,
    toggleLoginLayover,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
