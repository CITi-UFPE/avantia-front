import { useState, useEffect } from 'react';

function useMobile(breakpoint: number = 600) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);

    checkMobile();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('load', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('load', checkMobile);
    };
  }, []);

  return isMobile;
}

export default useMobile;
