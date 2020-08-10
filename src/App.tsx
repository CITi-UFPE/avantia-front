import React from 'react';
import {
  BrowserRouter as Browser,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Header } from 'components/organisms';
import GlobalProvider from 'contexts/GlobalProvider';

import { Analytic, Access, ExpiredSession } from 'components/pages';

import { AppWrapper } from 'App.style';

function App() {
  return (
    <Browser>
      <GlobalProvider>
        <AppWrapper>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/acesso" />
            </Route>
            <Route path="/acesso" component={Access} />
            <Route path="/analitico" component={Analytic} />
            <Route path="/expired" component={ExpiredSession} />
          </Switch>
        </AppWrapper>
      </GlobalProvider>
    </Browser>
  );
}

export default App;
