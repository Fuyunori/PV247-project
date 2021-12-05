import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Game of Life`;
  }, [title]);
};

export default usePageTitle;
