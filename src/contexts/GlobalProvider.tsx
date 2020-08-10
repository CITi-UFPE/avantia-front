import React, { useContext, useState } from 'react';

const GlobalContext = React.createContext([] as any);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState({
    latency: null,
    expiringDate: null,
    canvas: null,
    video: null,
  });

  return (
    // @ts-ignore
    <GlobalContext.Provider value={[info, setInfo]}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useInfo = () => useContext(GlobalContext);

export default GlobalProvider;
