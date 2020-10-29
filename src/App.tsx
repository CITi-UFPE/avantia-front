import React from 'react';
import {
  BrowserRouter as Browser,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Header } from 'components/organisms';
import GlobalProvider from 'contexts/GlobalProvider';

import {
  Analytic,
  Crowding,
  Access,
  ExpiredSession,
  Display,
  Share,
} from 'components/pages';

import { AppWrapper } from 'App.style';

function App() {
  return (
    <Browser>
      <GlobalProvider>
        <AppWrapper>
          <Header />
          <Switch>
            <Route exact path="/(|livedemo)">
              <Redirect to="/livedemo/acesso" />
            </Route>
            <Route path="/livedemo/acesso" component={Access} />
            <Route path="/livedemo/mascara" component={Analytic} />
            <Route path="/livedemo/aglomeracao" component={Crowding} />
            <Route path="/livedemo/expired" component={ExpiredSession} />
            <Route path="/livedemo/display" component={Display} />
            <Route path="/livedemo/s/:mediaId" component={Share} />
          </Switch>
        </AppWrapper>
      </GlobalProvider>
    </Browser>
  );
}

export default App;
