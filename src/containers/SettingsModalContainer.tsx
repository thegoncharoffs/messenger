import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { SettingsModal } from '../components/SettingsModal';
import { AppState } from '../state/store';
import { userUpdate, userModalClose, UserActions } from '../state/actions';
import i18n from '../i18n/i18n';
import { ThunkDispatch } from 'redux-thunk';

type StateProps = {
  user: User;
  visible: boolean;
};

type DispatchProps = {
  onSettingsChange: (user: User) => void;
  onSettingsModalClose: () => void;
};

type Props = StateProps & DispatchProps;

export const SettingsModalContainer: FC<Props> = ({
  user,
  visible,
  onSettingsChange,
  onSettingsModalClose,
}) => {
  useEffect(() => {
    i18n.changeLanguage(user.settings.language);
    document.body.className = '';
    document.body.className = `${
      user.settings.theme === 'dark' ? 'bg-dark' : 'bg-white'
    }`;
  }, [user]);

  return (
    <SettingsModal
      user={user}
      visible={visible}
      theme={user.settings.theme}
      onSettingsModalClose={onSettingsModalClose}
      onSettingsChange={onSettingsChange}
    ></SettingsModal>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    user: state.user.user,
    visible: state.user.modalVisible,
  };
};

const mapDispathToProps = (
  dispatch: ThunkDispatch<AppState, void, UserActions>
): DispatchProps => {
  return {
    onSettingsChange: (user: User) => dispatch(userUpdate(user)),
    onSettingsModalClose: () => dispatch(userModalClose()),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(SettingsModalContainer);
