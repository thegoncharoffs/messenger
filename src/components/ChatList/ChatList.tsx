import React, { FC, useRef } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { BsPlusCircle, BsX } from 'react-icons/bs';
import './ChatList.scss';

export type ChatListProps = {
  chats: Chat[];
  onChatAdd: (title: string) => void;
  onChatDelete: (id: string) => void;
};

export const ChatList: FC<ChatListProps> = ({
  chats,
  onChatAdd,
  onChatDelete,
}) => {
  let { chatId } = useParams<{ chatId: string }>();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && inputRef?.current?.value) {
      onChatAdd(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  const handleAddButtonClick = (): void => {
    if (inputRef?.current?.value) {
      onChatAdd(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <Col className="chat-list__list bg-dark">
        <ListGroup variant="flush">
          {chats?.map((chat) => {
            return (
              <div className="position-relative" key={chat.id}>
                <ListGroup.Item
                  as={Link}
                  to={`/${chat.id}`}
                  action
                  variant="dark"
                  active={chat.id === chatId}
                >
                  {chat.title + (chat.isUnread ? '*' : '')}
                </ListGroup.Item>

                <BsX
                  className="chat-list__icon-remove"
                  onClick={() => onChatDelete(chat.id)}
                />
              </div>
            );
          })}
        </ListGroup>
      </Col>

      <Row className="m-0 p-3 flex-nowrap align-items-center custom-shadow">
        <Form.Control
          className="w-100 mr-3"
          ref={inputRef}
          type="text"
          placeholder={t('NEW_CHAT')}
          onKeyPress={handleKeyPress}
        />
        <BsPlusCircle
          className="chat-list__icon-add"
          onClick={handleAddButtonClick}
        />
      </Row>
    </>
  );
};
