import update from 'immutability-helper';
import { Reducer } from 'redux';
import { MessagesActions, MessagesActionTypes } from '../actions';

export type MessagesReducerState = {
  loading: boolean;
  messages: Message[];
};

const initialState: MessagesReducerState = {
  loading: true,
  messages: [],
};

export const messagesReducer: Reducer<MessagesReducerState, MessagesActions> = (state = initialState, action) => {
  let index; // Message index in array

  switch (action.type) {
    case MessagesActionTypes.MESSAGES_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MessagesActionTypes.MESSAGES_LOAD_FAILURE:
    case MessagesActionTypes.MESSAGES_ADD_FAILURE:
    case MessagesActionTypes.MESSAGES_DELETE_FAILURE:
      console.warn(action.payload);
      return {
        ...state,
        messages: [],
        loading: false,
      };

    case MessagesActionTypes.MESSAGES_LOAD_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };

    case MessagesActionTypes.MESSAGES_ADD_SUCCESS:
      return update(state, {
        messages: {
          $push: [action.payload]
        },
      });

    case MessagesActionTypes.MESSAGES_DELETE_SUCCESS:
      // Getting message array id
      index = state.messages.findIndex(message => message.id === action.payload);
      if (index !== -1) {
        return update(state, {
          messages: {
            $splice: [[index, 1]],
          },
        });
      }
      return state;

    default:
      return state;
  }
}