import React, { FC } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import classNames from 'classnames';
import MessengerContainer from '../../containers/MessagerContainer';
import ChatListContainer from '../../containers/ChatListContainer';
import SettingsModalContainer from '../../containers/SettingsModalContainer';
import HeaderContainer from '../../containers/HeaderContainer';
import './Chat.scss';

export type ChatProps = {
  chatsLoading: boolean;
  messagesLoading: boolean;
  theme: Theme;
};

export const Chat: FC<ChatProps> = ({
  chatsLoading,
  messagesLoading,
  theme,
}) => {
  const chatListClasses = classNames(
    'd-flex flex-column flex-grow-1 justify-content-between',
    {
      'bg-secondary': theme === 'light',
      'bg-dark': theme === 'dark',
    }
  );

  return (
    <>
      <Container>
        <Col className="p-0 shadow-lg">
          <HeaderContainer />

          <Row noGutters className="chat">
            <Col md="3" className={chatListClasses}>
              {chatsLoading ? (
                <div className="chat__spinner-container">
                  <Spinner animation="border" variant="light" />
                </div>
              ) : (
                <ChatListContainer />
              )}
            </Col>

            <Col md="9" className="d-flex flex-column flex-grow-1">
              {messagesLoading ? (
                <div className="chat__spinner-container">
                  <Spinner animation="border" variant="secondary" />
                </div>
              ) : (
                <MessengerContainer />
              )}
            </Col>
          </Row>
        </Col>
      </Container>

      <SettingsModalContainer />
    </>
  );
};
