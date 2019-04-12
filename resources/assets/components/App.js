import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PuckProvider } from '@dosomething/puck-client';

import { env } from '../helpers';
import graphqlClient from '../graphql';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import BlockPage from './pages/BlockPage/BlockPage';
import CampaignContainer from './Campaign/CampaignContainer';
import { getUserId, isAuthenticated } from '../selectors/user';
import AccountContainer from './pages/AccountPage/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';

const App = ({ store, history }) => {
  initializeStore(store);

  const state = store.getState();

  return (
    <Provider store={store}>
      <PuckProvider
        source="phoenix-next"
        getUser={() => getUserId(state)}
        isAuthenticated={() => isAuthenticated(state)}
        history={history}
        puckUrl={env('PUCK_URL')}
      >
        <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/us" component={HomePage} />
              <Route path="/us/account" component={AccountContainer} />
              <Route path="/us/blocks/:id" component={BlockPage} />
              <Route path="/us/campaigns/:slug" component={CampaignContainer} />
              <Route path="/us/:slug" component={PageDispatcherContainer} />
            </Switch>
          </ConnectedRouter>
        </ApolloProvider>
      </PuckProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
