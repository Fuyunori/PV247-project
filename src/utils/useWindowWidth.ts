import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const storeInnerWidth = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', storeInnerWidth);
    return () => window.removeEventListener('resize', storeInnerWidth);
  }, []);

  return width;
};

export default useWindowWidth;
