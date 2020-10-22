import React, { FC, useEffect, useRef } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Message } from '../Message';
import classNames from 'classnames';
import './MessageList.scss';

type MessageListProps = {
  items: Message[];
  user: User;
  typingAuthor: string;
  theme?: Theme;
  onMessageClose: (id: string) => void;
};

export const MessageList: FC<MessageListProps> = ({
  items,
  user,
  typingAuthor,
  theme = 'light',
  onMessageClose,
}) => {
  const { t } = useTranslation();
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.scrollTop = blockRef.current.scrollHeight;
    }
  });

  const classes = classNames('message-list', {
    'bg-white text-secondary': theme === 'light',
    'bg-secondary text-white': theme === 'dark',
  });

  return (
    <Col ref={blockRef} className={classes}>
      {items.map((item) => (
        <Message
          {...item}
          user={user}
          onMessageClose={onMessageClose}
          key={item.id}
        />
      ))}
      {typingAuthor && (
        <div>
          {`${typingAuthor} ${t('WRITING')}... `}
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      )}
    </Col>
  );
};
