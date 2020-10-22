import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatContainer from './containers/ChatContainer';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './state/store';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App: FC = hot(() => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={`/:chatId`} exact>
            <ChatContainer></ChatContainer>
          </Route>
          <Route path={`*`}>
            <ChatContainer></ChatContainer>
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
});

ReactDOM.render(<App />, document.getElementById('root'));
