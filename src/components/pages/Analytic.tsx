import React from 'react';

import { Footer } from 'components/organisms';
import { Background } from 'components/atoms';
import { Mask } from 'components/organisms/Analytics';

function Analytic() {
  return (
    <>
      <Background>
        <Mask />
      </Background>
      <Footer disabled={false} />
    </>
  );
}

export default Analytic;
