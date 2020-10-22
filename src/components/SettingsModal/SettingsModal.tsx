import React, { FC } from 'react';
import { Button, Modal, FormGroup, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import './SettingsModal.scss';

const SettingsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'SHORT_TEXT_ERROR')
    .max(30, 'LONG_TEXT_ERROR')
    .matches(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'PATTERN_ERROR')
    .required('REQUIRED_ERROR'),
  lastName: Yup.string()
    .min(3, 'SHORT_TEXT_ERROR')
    .max(30, 'LONG_TEXT_ERROR')
    .matches(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'PATTERN_ERROR')
    .required('REQUIRED_ERROR'),
  theme: Yup.string().required('REQUIRED_ERROR'),
  language: Yup.string().required('REQUIRED_ERROR'),
});

type FormModel = {
  firstName: string;
  lastName: string;
  theme: Theme;
  language: Language;
};

export type SettingsModalProps = {
  user: User;
  visible: boolean;
  theme?: Theme;
  onSettingsModalClose: () => void;
  onSettingsChange: (user: User) => void;
};

export const SettingsModal: FC<SettingsModalProps> = ({
  user,
  visible,
  theme = 'light',
  onSettingsModalClose,
  onSettingsChange,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (values: FormModel) => {
    handleModalClose();
    onSettingsChange({
      ...user,
      firstName: values.firstName,
      lastName: values.lastName,
      settings: {
        theme: values.theme,
        language: values.language,
      },
    });
  };

  const handleModalClose = () => {
    onSettingsModalClose();
  };

  const modalClasses = classNames({
    'bg-white': theme === 'light',
    'bg-dark text-white': theme === 'dark',
  });

  return (
    <Modal show={visible} onHide={handleModalClose}>
      <Modal.Header className={modalClasses}>
        <Modal.Title>{t('SETTINGS')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={
          {
            firstName: user.firstName,
            lastName: user.lastName,
            theme: user.settings.theme,
            language: user.settings.language,
          } as FormModel
        }
        validationSchema={SettingsSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, getFieldProps }) => (
          <Form>
            <Modal.Body className={modalClasses}>
              <FormGroup>
                <FormLabel>{t('FIRST_NAME')}</FormLabel>
                <Field
                  className="form-control"
                  name="firstName"
                  placeholder={t('INPUT_AUTHORS_FIRST_NAME')}
                />
                {errors.firstName && touched.firstName ? (
                  <div className="invalid-feedback d-block">
                    {t(errors.firstName)}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('LAST_NAME')}</FormLabel>
                <Field
                  className="form-control"
                  name="lastName"
                  placeholder={t('INPUT_AUTHORS_LAST_NAME')}
                />
                {errors.lastName && touched.lastName ? (
                  <div className="invalid-feedback d-block">
                    {t(errors.lastName)}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('THEME')}</FormLabel>
                <Field
                  className="form-control"
                  name="theme"
                  placeholder={t('CHOOSE_THEME')}
                  as="select"
                >
                  <option value="light">{t('LIGHT')}</option>
                  <option value="dark">{t('DARK')}</option>
                </Field>
                {errors.theme && touched.theme ? (
                  <div className="invalid-feedback d-block">
                    {t(errors.theme)}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup controlId="language">
                <FormLabel>{t('LANGUAGE')}</FormLabel>
                <Field
                  className="form-control"
                  name="language"
                  placeholder={t('CHOOSE_LANGUAGE')}
                  as="select"
                >
                  <option value="en">{t('ENGLISH')}</option>
                  <option value="ru">{t('RUSSIAN')}</option>
                </Field>
                {errors.language && touched.language ? (
                  <div className="invalid-feedback d-block">
                    {t(errors.language)}
                  </div>
                ) : null}
              </FormGroup>
            </Modal.Body>

            <Modal.Footer className={modalClasses}>
              <Button type="submit" variant="warning">
                {t('APPLY')}
              </Button>
              <Button variant="secondary" onClick={onSettingsModalClose}>
                {t('CLOSE')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
