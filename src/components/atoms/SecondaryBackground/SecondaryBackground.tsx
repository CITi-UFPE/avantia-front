import React from 'react';

import middleSvg from 'assets/background.svg';

import {
  BackgroundBase,
  BackgroundLeft,
  BackgroundRight,
} from './SecondaryBackground.style';

function SecondaryBackground({
  children,
  mobileHigher = false,
}: {
  children: React.ReactNode,
  mobileHigher?: boolean,
}) {
  return (
    <BackgroundBase mobileHigher={mobileHigher}>
      <BackgroundRight src={middleSvg} />
      <BackgroundLeft src={middleSvg} />
      {children}
    </BackgroundBase>
  );
}

SecondaryBackground.defaultProps = {
  mobileHigher: false,
};

export default SecondaryBackground;
