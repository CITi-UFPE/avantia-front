import React from 'react';

import middleSvg from 'assets/background.svg';

import {
  BackgroundBase,
  BackgroundLeft,
  BackgroundRight,
} from './SecondaryBackground.style';

function SecondaryBackground({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundBase>
      <BackgroundRight src={middleSvg} />
      <BackgroundLeft src={middleSvg} />
      {children}
    </BackgroundBase>
  );
}

export default SecondaryBackground;
