import React from 'react';

import {
  Header,
  VideoContainer,
  Footer,
} from 'components/organisms';
import { Background } from 'components/atoms';
import GlobalProvider from 'contexts/GlobalProvider';

import { AppWrapper } from 'App.style';

function App() {
  return (
    <GlobalProvider>
      <AppWrapper>
        <Header />
        <Background>
          <VideoContainer />
        </Background>
        <Footer />
      </AppWrapper>
    </GlobalProvider>
  );
}

export default App;
