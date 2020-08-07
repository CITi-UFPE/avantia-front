import React from 'react';

import { Header, VideoContainer } from 'components/organisms';
import { Background } from 'components/atoms';

import { AppWrapper } from 'App.style';

function App() {
  return (
    <AppWrapper>
      <Header />
      <Background>
        <VideoContainer />
      </Background>
    </AppWrapper>
  );
}

export default App;
