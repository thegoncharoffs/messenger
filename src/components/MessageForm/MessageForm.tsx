import React, { FC, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './MessageForm.scss';

type MessageFormProps = {
  onMessageSend: (message: string) => void;
};

export const MessageForm: FC<MessageFormProps> = ({ onMessageSend }) => {
  const [text, setText] = useState<string>('');
  const { t } = useTranslation();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    onMessageSend(text);
    setText('');
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && text) {
      handleSubmit();
    }
  };

  return (
    <Row className="custom-shadow pt-3 m-0">
      <Col md="8">
        <Form.Control
          className="mb-3"
          name="text"
          value={text}
          placeholder={t('ENTER_MESSAGE')}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </Col>

      <Col md="4">
        <Button
          className="mb-3 w-100"
          variant="warning"
          onClick={handleSubmit}
          disabled={!text.length}
        >
          {t('SEND')}
        </Button>
      </Col>
    </Row>
  );
};
