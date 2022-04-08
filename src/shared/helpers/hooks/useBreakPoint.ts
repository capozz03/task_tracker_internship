import { useEffect, useState } from 'react';

export const useBreakPoint = (breakPoint = 0) => {
  const [isMobile, setIsMobile] = useState(breakPoint >= window.innerWidth);
  useEffect(() => {
    const handler = () => setIsMobile(breakPoint >= window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakPoint]);
  return isMobile;
};
