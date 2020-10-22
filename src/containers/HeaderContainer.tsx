import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/Header';
import { AppState } from '../state/store';
import { UserActions, userModalOpen } from '../state/actions';
import { Dispatch } from 'redux';

type StateProps = {
  userLoading: boolean;
};

type DispatchProps = {
  onSettingsButtonClick: () => void;
};

type Props = StateProps & DispatchProps;

export const HeaderContainer: FC<Props> = ({
  userLoading,
  onSettingsButtonClick,
}) => {
  return (
    <Header
      userLoading={userLoading}
      onSettingsButtonClick={onSettingsButtonClick}
    />
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    userLoading: state.user.loading,
  };
};

const mapDispathToProps = (dispatch: Dispatch<UserActions>): DispatchProps => {
  return {
    onSettingsButtonClick: () => dispatch(userModalOpen()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(HeaderContainer);
