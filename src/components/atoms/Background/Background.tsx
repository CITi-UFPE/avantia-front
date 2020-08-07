import React from 'react';

import {
  BackgroundBase,
  BackgroundLeft,
  BackgroundRight,
} from './Background.style';

function Background({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundBase>
      <BackgroundRight />
      <BackgroundLeft />
      {children}
    </BackgroundBase>
  );
}

export default Background;
