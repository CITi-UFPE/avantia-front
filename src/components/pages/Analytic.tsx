import React from 'react';

import { VideoContainer, Footer } from 'components/organisms';
import { Background } from 'components/atoms';

function Analytic() {
  return (
    <>
      <Background>
        <VideoContainer />
      </Background>
      <Footer disabled={false} />
    </>
  );
}

export default Analytic;
