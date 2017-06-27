import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { initializeStore } from '../store';

import { paths } from '../helpers/navigation';
import ChromeContainer from '../containers/ChromeContainer';
import FeedContainer from '../containers/FeedContainer';
import { ActionPageContainer } from './ActionPage';
import { BlockContainer } from './Block';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

const wrap = (Container, Component) => props => (
  <Container><Component {...props} /></Container>
);

const chrome = component => wrap(ChromeContainer, component);

const App = ({ store, history }) => {
  initializeStore(store);

  const campaignClosed = new Date(store.getState().campaign.endDate.date) - new Date() < 0;
  const ActionPage = campaignClosed ? null : (
    <Route path={paths.action} component={chrome(ActionPageContainer)} />
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* Base user experience */}
          <Route path={paths.community} exact component={chrome(FeedContainer)} />
          { ActionPage }
          <Route path={`${paths.pages}:page`} component={chrome(ContentPageContainer)} />
          <Route path={`${paths.blocks}:id`} component={chrome(BlockContainer)} />
          {/* * */}

          {/* Custom user experiences... */}

          {/* 404 default */}
          <Route component={chrome(NotFound)} />
          {/* * */}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
