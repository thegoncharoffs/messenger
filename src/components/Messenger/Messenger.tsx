import React, { FC } from 'react';
import { MessageList } from '../MessageList';
import { MessageForm } from '../MessageForm';
import './Messenger.scss';

export type MessengerProps = {
  messages: Message[];
  user: User;
  theme?: Theme;
  typingAuthor: string;
  onMessageSend: (message: string) => void;
  onMessageClose: (id: string) => void;
};

export const Messenger: FC<MessengerProps> = ({
  messages,
  user,
  theme = 'light',
  typingAuthor,
  onMessageSend,
  onMessageClose,
}) => {
  return (
    <>
      <MessageList
        items={messages}
        user={user}
        typingAuthor={typingAuthor}
        onMessageClose={onMessageClose}
        theme={theme}
      />
      <MessageForm onMessageSend={onMessageSend} />
    </>
  );
};
