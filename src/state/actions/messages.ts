import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';

// Need for messages loading abortions
let abortController = new AbortController();

// Define actions types
export enum MessagesActionTypes {
  // Load
  MESSAGES_LOAD_REQUEST = 'MESSAGES_LOAD_REQUEST',
  MESSAGES_LOAD_SUCCESS = 'MESSAGES_LOAD_SUCCESS',
  MESSAGES_LOAD_FAILURE = 'MESSAGES_LOAD_FAILURE',
  MESSAGES_LOAD_ABORTION = 'MESSAGES_LOAD_ABORTION',

  // Add
  MESSAGES_ADD_REQUEST = 'MESSAGES_ADD_REQUEST',
  MESSAGES_ADD_SUCCESS = 'MESSAGES_ADD_SUCCESS',
  MESSAGES_ADD_FAILURE = 'MESSAGES_ADD_FAILURE',

  // Delete
  MESSAGES_DELETE_REQUEST = 'MESSAGES_DELETE_REQUEST',
  MESSAGES_DELETE_SUCCESS = 'MESSAGES_DELETE_SUCCESS',
  MESSAGES_DELETE_FAILURE = 'MESSAGES_DELETE_FAILURE',
}

// Define actions functions types
// Load
export type MessagesLoadRequestAction = {
  type: MessagesActionTypes.MESSAGES_LOAD_REQUEST;
};

export type MessagesLoadSuccessAction = {
  type: MessagesActionTypes.MESSAGES_LOAD_SUCCESS;
  payload: Message[];
};

export type MessagesLoadFailureAction = {
  type: MessagesActionTypes.MESSAGES_LOAD_FAILURE;
  payload: string;
};

export type MessagesLoadAbortionAction = {
  type: MessagesActionTypes.MESSAGES_LOAD_ABORTION;
};

// Add
export type MessagesAddRequestAction = {
  type: MessagesActionTypes.MESSAGES_ADD_REQUEST;
};

export type MessagesAddSuccessAction = {
  type: MessagesActionTypes.MESSAGES_ADD_SUCCESS;
  payload: Message;
};

export type MessagesAddFailureAction = {
  type: MessagesActionTypes.MESSAGES_ADD_FAILURE;
  payload: string;
};

// Delete
export type MessagesDeleteRequestAction = {
  type: MessagesActionTypes.MESSAGES_DELETE_REQUEST;
};

export type MessagesDeleteSuccessAction = {
  type: MessagesActionTypes.MESSAGES_DELETE_SUCCESS;
  payload: string;
};

export type MessagesDeleteFailureAction = {
  type: MessagesActionTypes.MESSAGES_DELETE_FAILURE;
  payload: string;
};

// All actions
export type MessagesActions =
  // Load
  MessagesLoadRequestAction |
  MessagesLoadSuccessAction |
  MessagesLoadFailureAction |
  MessagesLoadAbortionAction |

  // Add
  MessagesAddRequestAction |
  MessagesAddSuccessAction |
  MessagesAddFailureAction |

  // Delete
  MessagesDeleteRequestAction |
  MessagesDeleteSuccessAction |
  MessagesDeleteFailureAction;

// Exporting actions
// Load
export const messagesLoad = (chatId: string): ThunkAction<void, AppState, void, MessagesActions> =>
  async (dispatch: Dispatch) => {
    try {
      // Abort previous fetch request
      abortController.abort();
      abortController = new AbortController();

      // Loading logic
      dispatch(messagesLoadRequest());
      const result = await fetch(`/api/messages/${chatId}`, { signal: abortController.signal });
      dispatch(messagesLoadSuccess(await result.json()));
    } catch (error) {
      if (error?.name === 'AbortError') {
        dispatch(messagesLoadAbortion());
      } else {
        dispatch(messagesLoadFailure(error));
      }
    }
  };

export const messagesLoadRequest: ActionCreator<MessagesLoadRequestAction> = () => ({
  type: MessagesActionTypes.MESSAGES_LOAD_REQUEST,
});

export const messagesLoadSuccess: ActionCreator<MessagesLoadSuccessAction> = (payload: Message[]) => ({
  type: MessagesActionTypes.MESSAGES_LOAD_SUCCESS,
  payload
});

export const messagesLoadFailure: ActionCreator<MessagesLoadFailureAction> = (payload: string) => ({
  type: MessagesActionTypes.MESSAGES_LOAD_FAILURE,
  payload
});

export const messagesLoadAbortion: ActionCreator<MessagesLoadAbortionAction> = () => ({
  type: MessagesActionTypes.MESSAGES_LOAD_ABORTION,
});

// Add
export const messagesAdd = (message: string): ThunkAction<void, AppState, void, MessagesActions> =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const state = getState();
      dispatch(messagesAddRequest());
      const result = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: message,
          chat: state.router.location.pathname.substring(1),
          author: state.user.user.id,
          createdAt: new Date(),
          closable: true,
        }),
      });
      dispatch(messagesAddSuccess(await result.json()));
    } catch (error) {
      dispatch(messagesAddFailure(error));
    }
  };

export const messagesAddRequest: ActionCreator<MessagesAddRequestAction> = () => ({
  type: MessagesActionTypes.MESSAGES_ADD_REQUEST,
});

export const messagesAddSuccess: ActionCreator<MessagesAddSuccessAction> = (payload: Message) => ({
  type: MessagesActionTypes.MESSAGES_ADD_SUCCESS,
  payload
});

export const messagesAddFailure: ActionCreator<MessagesAddFailureAction> = (payload: string) => ({
  type: MessagesActionTypes.MESSAGES_ADD_FAILURE,
  payload
});

// Delete
export const messagesDelete = (id: string): ThunkAction<void, AppState, void, MessagesActions> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(messagesDeleteRequest());
      await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
      dispatch(messagesDeleteSuccess(id));
    } catch (error) {
      dispatch(messagesDeleteFailure(error));
    }
  };

export const messagesDeleteRequest: ActionCreator<MessagesDeleteRequestAction> = () => ({
  type: MessagesActionTypes.MESSAGES_DELETE_REQUEST,
});

export const messagesDeleteSuccess: ActionCreator<MessagesDeleteSuccessAction> = (payload: string) => ({
  type: MessagesActionTypes.MESSAGES_DELETE_SUCCESS,
  payload
});

export const messagesDeleteFailure: ActionCreator<MessagesDeleteFailureAction> = (payload: string) => ({
  type: MessagesActionTypes.MESSAGES_DELETE_FAILURE,
  payload
});
