import React from 'react';
import { withRouter } from 'react-router-dom';

import { SecondaryBackground } from 'components/atoms';
import { ShareFooter } from 'components/organisms';
import { VideoPlayer } from 'components/molecules';

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
          {location.state.type === 'video' && <VideoPlayer src={data} />}
        </Container>
      </SecondaryBackground>
      <ShareFooter data={data} type={location.state.type} />
    </>
  );
}

export default withRouter(Display);
