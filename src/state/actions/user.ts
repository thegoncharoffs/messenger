import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';

// Define actions types
export enum UserActionTypes {
  // Load
  USER_LOAD_REQUEST = 'USER_LOAD_REQUEST',
  USER_LOAD_SUCCESS = 'USER_LOAD_SUCCESS',
  USER_LOAD_FAILURE = 'USER_LOAD_FAILURE',

  // Update
  USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE',

  // Other
  USER_MODAL_OPEN = 'USER_MODAL_OPEN',
  USER_MODAL_CLOSE = 'USER_MODAL_CLOSE',
}

// Define actions functions types
// Load
export type UserLoadRequestAction = {
  type: UserActionTypes.USER_LOAD_REQUEST;
};

export type UserLoadSuccessAction = {
  type: UserActionTypes.USER_LOAD_SUCCESS;
  payload: User;
};

export type UserLoadFailureAction = {
  type: UserActionTypes.USER_LOAD_FAILURE;
  payload: string;
};

// Update
export type UserUpdateRequestAction = {
  type: UserActionTypes.USER_UPDATE_REQUEST;
  payload: User;
};

export type UserUpdateSuccessAction = {
  type: UserActionTypes.USER_UPDATE_SUCCESS;
};

export type UserUpdateFailureAction = {
  type: UserActionTypes.USER_UPDATE_FAILURE;
  payload: string;
};

// Other
export type UserModalOpenAction = {
  type: UserActionTypes.USER_MODAL_OPEN;
};

export type UserModalCloseAction = {
  type: UserActionTypes.USER_MODAL_CLOSE;
};

// All actions
export type UserActions =
  // Load 
  UserLoadRequestAction |
  UserLoadSuccessAction |
  UserLoadFailureAction |

  // Update
  UserUpdateRequestAction |
  UserUpdateSuccessAction |
  UserUpdateFailureAction |

  // Other
  UserModalOpenAction |
  UserModalCloseAction;

// Exporting actions
// Load
export const userLoad = (): ThunkAction<void, AppState, void, UserActions> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(userLoadRequest());
      const result = await fetch(`/api/user/${sessionStorage.getItem('userId')}`);
      dispatch(userLoadSuccess(await result.json()));
    } catch (error) {
      dispatch(userLoadFailure(error));
    }
  };

export const userLoadRequest: ActionCreator<UserLoadRequestAction> = () => ({
  type: UserActionTypes.USER_LOAD_REQUEST,
});

export const userLoadSuccess: ActionCreator<UserLoadSuccessAction> = (payload: User) => ({
  type: UserActionTypes.USER_LOAD_SUCCESS,
  payload
});

export const userLoadFailure: ActionCreator<UserLoadFailureAction> = (payload: string) => ({
  type: UserActionTypes.USER_LOAD_FAILURE,
  payload
});

// Load
export const userUpdate = (user: User): ThunkAction<void, AppState, void, UserActions> =>
  async (dispatch: Dispatch) => {
    try {
      // Show changes instantly
      dispatch(userUpdateRequest(user));
      const result = await fetch(`/api/user/${sessionStorage.getItem('userId')}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      await result.json();
      dispatch(userUpdateSuccess());
    } catch (error) {
      dispatch(userUpdateFailure(error));
    }
  };

export const userUpdateRequest: ActionCreator<UserUpdateRequestAction> = (payload: User) => ({
  type: UserActionTypes.USER_UPDATE_REQUEST,
  payload
});

export const userUpdateSuccess: ActionCreator<UserUpdateSuccessAction> = () => ({
  type: UserActionTypes.USER_UPDATE_SUCCESS,
});

export const userUpdateFailure: ActionCreator<UserUpdateFailureAction> = (payload: string) => ({
  type: UserActionTypes.USER_UPDATE_FAILURE,
  payload
});

// Other
export const userModalOpen: ActionCreator<UserModalOpenAction> = () => ({
  type: UserActionTypes.USER_MODAL_OPEN,
});

export const userModalClose: ActionCreator<UserModalCloseAction> = () => ({
  type: UserActionTypes.USER_MODAL_CLOSE,
});