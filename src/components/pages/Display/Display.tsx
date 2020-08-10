import React from 'react';
import { withRouter } from 'react-router-dom';

import { SecondaryBackground } from 'components/atoms';
import { ShareFooter } from 'components/organisms';

import {
  Container,
  Image,
} from './Display.style';

function Display({ location }: { location: any }) {
  const data = location.state?.data;

  return (
    <>
      <SecondaryBackground>
        <Container>
          {location.state.type === 'image' && <Image src={data} />}
        </Container>
      </SecondaryBackground>
      <ShareFooter />
    </>
  );
}

export default withRouter(Display);
