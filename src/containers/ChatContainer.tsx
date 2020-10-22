import React, { FC, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Chat } from '../components/Chat';
import { AppState } from '../state/store';
import { chatsLoad, userLoad } from '../state/actions';

type StateProps = {
  chatsLoading: boolean;
  messagesLoading: boolean;
  theme: Theme;
};

type Props = StateProps;

const ChatContainer: FC<Props> = ({ chatsLoading, messagesLoading, theme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Boris Goncharov user
    sessionStorage.setItem('userId', '5f6b6389334cf630c497358d');

    // Load data
    dispatch(chatsLoad());
    dispatch(userLoad());
  }, [dispatch]);

  return (
    <Chat
      chatsLoading={chatsLoading}
      messagesLoading={messagesLoading}
      theme={theme}
    />
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    chatsLoading: state.chats.loading,
    messagesLoading: state.messages.loading,
    theme: state.user.user?.settings.theme || 'light',
  };
};

export default connect(mapStateToProps)(ChatContainer);
