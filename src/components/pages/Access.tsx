import React from 'react';

import { Footer } from 'components/organisms';
import { Background } from 'components/atoms';
import { AccessCard } from 'components/molecules';

function Access() {
  return (
    <>
      <Background>
        <AccessCard />
      </Background>
      <Footer disabled />
    </>
  );
}

export default Access;
