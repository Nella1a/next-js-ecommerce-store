import { Children, createContext, useEffect, useState } from 'react';

export const OverlayContext = createContext({
  toggle: false,
  toggleLayover: () => {},
  toggleLogin: false,
  toggleLoginLayover: () => {},
});

export const OverLayContextProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);

  const toggleLayover = () => {
    if (toggleLogin) {
      setToggleLogin(false);
    }
    setToggle(!toggle);
  };

  const toggleLoginLayover = () => {
    if (toggle) {
      setToggle(false);
    }
    setToggleLogin(!toggleLogin);
  };

  const value = {
    toggle,
    toggleLayover,
    toggleLogin,
    toggleLoginLayover,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
