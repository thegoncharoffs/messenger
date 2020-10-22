import { Middleware } from 'redux';
import { chatsMarkRead, messagesLoad } from '../actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { AppState } from '../store';

export const routeMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (action.type === LOCATION_CHANGE) {
    const state = store.getState() as AppState;
    const activeChatId = state.router.location.pathname.substring(1);
    const chatExists = !!state.chats.chats.find(chat => chat.id === activeChatId);

    if (chatExists) {
      // Load messages for chat
      store.dispatch(messagesLoad(activeChatId) as any);
      store.dispatch(chatsMarkRead(activeChatId));
    }
  }

  return result;
};