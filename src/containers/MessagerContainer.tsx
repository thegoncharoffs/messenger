import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Messenger } from '../components/Messenger';
import { AppState } from '../state/store';
import { MessagesActions, messagesAdd, messagesDelete } from '../state/actions';
import { ThunkDispatch } from 'redux-thunk';

type StateProps = {
  messages: Message[];
  theme: Theme;
  user: User;
  typingAuthor: string;
};

type DispatchProps = {
  onMessageSend: (message: string) => void;
  onMessageClose: (id: string) => void;
};

type Props = StateProps & DispatchProps;

const MessengerContainer: FC<Props> = ({
  messages,
  user,
  typingAuthor,
  theme,
  onMessageSend,
  onMessageClose,
}) => {
  return (
    <Messenger
      messages={messages}
      user={user}
      typingAuthor={typingAuthor}
      theme={theme}
      onMessageSend={onMessageSend}
      onMessageClose={onMessageClose}
    />
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  const chatId = state.router.location.pathname.substr(1);
  const activeChat = state.chats.chats.find((chat) => chat.id === chatId);

  return {
    messages: state.messages.messages,
    theme: state.user.user.settings.theme,
    user: state.user.user,
    typingAuthor: activeChat?.typingAuthor || '',
  };
};

const mapDispathToProps = (
  dispatch: ThunkDispatch<AppState, void, MessagesActions>
): DispatchProps => {
  return {
    onMessageSend: (message: string) => dispatch(messagesAdd(message)),
    onMessageClose: (id: string) => dispatch(messagesDelete(id)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(MessengerContainer);
