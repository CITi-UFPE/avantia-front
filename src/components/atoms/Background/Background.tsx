import React from 'react';

import leftSvg from 'assets/background-left.svg';
import rightSvg from 'assets/background-right.svg';

import {
  BackgroundBase,
  BackgroundLeft,
  BackgroundRight,
} from './Background.style';

function Background({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundBase>
      <BackgroundRight src={rightSvg} />
      <BackgroundLeft src={leftSvg} />
      {children}
    </BackgroundBase>
  );
}

export default Background;
