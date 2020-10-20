import React from 'react';

import { Footer } from 'components/organisms';
import { Background } from 'components/atoms';
import { Crowding } from 'components/organisms/Analytics';

function Analytic() {
  return (
    <>
      <Background>
        <Crowding />
      </Background>
      <Footer disabled={false} />
    </>
  );
}

export default Analytic;
