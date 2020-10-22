import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { messagesMiddleware, routeMiddleware } from "./middlewares";
import { chatsReducer, ChatsReducerState, messagesReducer, MessagesReducerState, userReducer, UserReducerState } from "./reducers";
import thunk from 'redux-thunk';

export type AppState = {
  router: RouterState,
  chats: ChatsReducerState;
  messages: MessagesReducerState;
  user: UserReducerState;
};

export const history = createBrowserHistory();

const createRootReducer = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  chats: chatsReducer,
  messages: messagesReducer,
  user: userReducer,
});

export const store: Store = createStore(
  createRootReducer(history), // root reducer with router state
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      // ... other middlewares ...
      messagesMiddleware,
      routeMiddleware,
    )
  ),
);
