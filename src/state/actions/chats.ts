import { push } from 'connected-react-router';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';

// Define actions types
export enum ChatsActionTypes {
  // Loading
  CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
  CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
  CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

  // Delete
  CHATS_DELETE_REQUEST = 'CHATS_DELETE_REQUEST',
  CHATS_DELETE_SUCCESS = 'CHATS_DELETE_SUCCESS',
  CHATS_DELETE_FAILURE = 'CHATS_DELETE_FAILURE',

  // Add
  CHATS_ADD_REQUEST = 'CHATS_ADD_REQUEST',
  CHATS_ADD_SUCCESS = 'CHATS_ADD_SUCCESS',
  CHATS_ADD_FAILURE = 'CHATS_ADD_FAILURE',

  // Other
  CHATS_SET_TYPING_AUTHOR = 'CHATS_SET_TYPING_AUTHOR',
  CHATS_RESET_TYPING_AUTHOR = 'CHATS_RESET_TYPING_AUTHOR',
  CHATS_MARK_READ = 'CHATS_MARK_READ',
  CHATS_MARK_UNREAD = 'CHATS_MARK_UNREAD',
}

// Define actions functions types
// Load
export type ChatsLoadRequestAction = {
  type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};

export type ChatsLoadSuccessAction = {
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
  payload: Chat[];
};

export type ChatsLoadFailureAction = {
  type: ChatsActionTypes.CHATS_LOAD_FAILURE;
  payload: string;
};

// Delete
export type ChatsDeleteRequestAction = {
  type: ChatsActionTypes.CHATS_DELETE_REQUEST;
};

export type ChatsDeleteSuccessAction = {
  type: ChatsActionTypes.CHATS_DELETE_SUCCESS;
  payload: string;
};

export type ChatsDeleteFailureAction = {
  type: ChatsActionTypes.CHATS_DELETE_FAILURE;
  payload: string;
};

// Add
export type ChatsAddRequestAction = {
  type: ChatsActionTypes.CHATS_ADD_REQUEST;
};

export type ChatsAddSuccessAction = {
  type: ChatsActionTypes.CHATS_ADD_SUCCESS;
  payload: Chat;
};

export type ChatsAddFailureAction = {
  type: ChatsActionTypes.CHATS_ADD_FAILURE;
  payload: string;
};

// Other
export type ChatsSetTypingAuthorAction = {
  type: ChatsActionTypes.CHATS_SET_TYPING_AUTHOR;
  payload: { chatId: string, author: string };
};

export type ChatsResetTypingAuthorAction = {
  type: ChatsActionTypes.CHATS_RESET_TYPING_AUTHOR;
  payload: string;
};

export type ChatsMarkReadAction = {
  type: ChatsActionTypes.CHATS_MARK_READ;
  payload: string;
};

export type ChatsMarkUnreadAction = {
  type: ChatsActionTypes.CHATS_MARK_UNREAD;
  payload: string;
};

// All actions
export type ChatsActions =
  // Load
  ChatsLoadRequestAction |
  ChatsLoadSuccessAction |
  ChatsLoadFailureAction |

  // Delete
  ChatsDeleteRequestAction |
  ChatsDeleteSuccessAction |
  ChatsDeleteFailureAction |

  // Add
  ChatsAddRequestAction |
  ChatsAddSuccessAction |
  ChatsAddFailureAction |

  // Other
  ChatsSetTypingAuthorAction |
  ChatsResetTypingAuthorAction |
  ChatsMarkReadAction |
  ChatsMarkUnreadAction;


// Exporting actions
// Load
export const chatsLoad = (): ThunkAction<void, AppState, void, ChatsActions> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(chatsLoadRequest());
      const result = await fetch(`/api/chats`);
      const chats = await result.json();
      dispatch(chatsLoadSuccess(chats));
      // Relocate to 1st chat
      dispatch(push(`/${chats[0].id}`));
    } catch (error) {
      dispatch(chatsLoadFailure(error));
    }
  };

export const chatsLoadRequest: ActionCreator<ChatsLoadRequestAction> = () => ({
  type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccess: ActionCreator<ChatsLoadSuccessAction> = (payload: Chat[]) => ({
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload
});

export const chatsLoadFailure: ActionCreator<ChatsLoadFailureAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload
});

// Delete
export const chatsDelete = (id: string): ThunkAction<void, AppState, void, ChatsActions> =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      dispatch(chatsDeleteRequest());
      const result = await fetch(`/api/chats/${id}`, {
        method: 'DELETE',
      });
      await result.json();
      dispatch(chatsDeleteSuccess(id));
      // Relocate to 1st chat
      dispatch(push(`/${getState().chats.chats[0].id}`));
    } catch (error) {
      dispatch(chatsDeleteFailure(error));
    }
  };

export const chatsDeleteRequest: ActionCreator<ChatsDeleteRequestAction> = () => ({
  type: ChatsActionTypes.CHATS_DELETE_REQUEST,
});

export const chatsDeleteSuccess: ActionCreator<ChatsDeleteSuccessAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_DELETE_SUCCESS,
  payload
});

export const chatsDeleteFailure: ActionCreator<ChatsDeleteFailureAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_DELETE_FAILURE,
  payload
});

// Add
export const chatsAdd = (title: string): ThunkAction<void, AppState, void, ChatsActions> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(chatsAddRequest());
      const result = await fetch(`/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, owner: sessionStorage.getItem('userId') }),
      });
      const addedChat = await result.json() as Chat;
      dispatch(chatsAddSuccess({ ...addedChat, typingAuthor: '', isUnread: false }));
      // Relocate to new chat
      dispatch(push(`/${addedChat.id}`));
    } catch (error) {
      dispatch(chatsAddFailure(error));
    }
  };

export const chatsAddRequest: ActionCreator<ChatsAddRequestAction> = () => ({
  type: ChatsActionTypes.CHATS_ADD_REQUEST,
});

export const chatsAddSuccess: ActionCreator<ChatsAddSuccessAction> = (payload: Chat) => ({
  type: ChatsActionTypes.CHATS_ADD_SUCCESS,
  payload
});

export const chatsAddFailure: ActionCreator<ChatsAddFailureAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_ADD_FAILURE,
  payload
});

// Other
export const chatsSetTypingAuthor: ActionCreator<ChatsSetTypingAuthorAction> = (payload: { chatId: string, author: string }) => ({
  type: ChatsActionTypes.CHATS_SET_TYPING_AUTHOR,
  payload
});

export const chatsResetTypingAuthor: ActionCreator<ChatsResetTypingAuthorAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_RESET_TYPING_AUTHOR,
  payload
});

export const chatsMarkRead: ActionCreator<ChatsMarkReadAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_MARK_READ,
  payload
});

export const chatsMarkUnread: ActionCreator<ChatsMarkUnreadAction> = (payload: string) => ({
  type: ChatsActionTypes.CHATS_MARK_UNREAD,
  payload
});