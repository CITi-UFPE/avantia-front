import { useState, useEffect } from 'react';

function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth > 600);

    window.addEventListener('resize', checkMobile);
    window.addEventListener('load', checkMobile);
  }, []);

  return isMobile;
}

export default useMobile;
