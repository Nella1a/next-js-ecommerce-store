import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);

    };
  },
  [ref, handler],
  );

};

// Hide gray layer over body
export const disableGrayLayer = (value, changeValue) => {
  useEffect(() => {
    value && changeValue(false)
  },[])

}