import { Middleware } from 'redux';
import { chatsMarkUnread, chatsResetTypingAuthor, chatsSetTypingAuthor, MessagesActionTypes, messagesAddSuccess, MessagesAddSuccessAction } from '../actions';
import { AppState } from '../store';

const BOT = {
  id: '5f6b6389334cf630c4973591',
  firstName: 'Bot'
}

export const messagesMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (action.type === MessagesActionTypes.MESSAGES_ADD_SUCCESS) {
    const { chat, author } = (action as MessagesAddSuccessAction).payload;
    const state = (store.getState() as AppState);

    const typingAuthor = state.chats.chats.find(item => item.id === chat)?.typingAuthor;
    const botIsWriting = typingAuthor === BOT.firstName;
    const activeChatId = state.router.location.pathname.substring(1);

    // Send Bot's response on user message
    // We don't send another Bot's response if Bot is already typing
    if (author.id !== BOT.id && !botIsWriting) {
      const botMessage = {
        chat,
        author: BOT.id,
        text: `Hi, ${author.firstName}! This is ${BOT.firstName}...`,
        closable: true,
        createdAt: new Date(),
        loading: true,
      };

      store.dispatch(chatsSetTypingAuthor({ chatId: chat, author: BOT.firstName }));

      setTimeout(async () => {
        // Send BOT's message
        const result = await fetch(`/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(botMessage),
        });
        const receivedMessage = await result.json();
        const activeChatId = store.getState().router.location.pathname.substring(1);

        if (activeChatId === chat) {
          store.dispatch(messagesAddSuccess(receivedMessage));
          store.dispatch(chatsResetTypingAuthor(chat));
        } else {
          store.dispatch(chatsMarkUnread(chat));
        }
      }, 2000);
    }

    // Highlight chat if message arrived in inactive chat
    if (chat !== activeChatId) {
      store.dispatch(chatsMarkUnread(chat));
    }
  }

  return result;
};