import { Reducer } from 'redux';
import { UserActions, UserActionTypes } from '../actions';

export type UserReducerState = {
  loading: boolean;
  modalVisible: boolean;
  user: User;
};

const emptyUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  settings: {
    theme: "light",
    language: "en"
  }
};

const initialState: UserReducerState = {
  loading: false,
  modalVisible: false,
  user: emptyUser,
};

export const userReducer: Reducer<UserReducerState, UserActions> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case UserActionTypes.USER_LOAD_FAILURE:
      console.warn(action.payload);
      return {
        ...state,
        user: emptyUser,
        loading: false,
      };

    case UserActionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        user: action.payload,
      };

    case UserActionTypes.USER_MODAL_OPEN:
      return {
        ...state,
        modalVisible: true,
      };

    case UserActionTypes.USER_MODAL_CLOSE:
      return {
        ...state,
        modalVisible: false,
      };

    default:
      return state;
  }
}