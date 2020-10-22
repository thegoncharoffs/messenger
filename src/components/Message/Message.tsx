import React, { FC } from 'react';
import classNames from 'classnames';
import './Message.scss';

export type MessageProps = Message & {
  user: User;
  onMessageClose: (id: string) => void;
};

export const Message: FC<MessageProps> = ({
  text,
  author,
  id,
  createdAt,
  closable,
  user,
  onMessageClose,
}) => {
  const userIsAuthor = author.id === user.id;

  const classes = classNames('message', {
    _grey: !userIsAuthor,
    _yellow: userIsAuthor,
  });

  const dateObj = new Date(createdAt);

  return (
    <div className={classes}>
      <div>{text}</div>
      <small className="float-right">
        {author.firstName}, {dateObj.getDate()}/{dateObj.getMonth()}/
        {dateObj.getFullYear()}&nbsp;{dateObj.getHours()}:{dateObj.getMinutes()}{' '}
      </small>

      {closable && (
        <span className="message__close" onClick={() => onMessageClose(id)}>
          &#10005;
        </span>
      )}
    </div>
  );
};
