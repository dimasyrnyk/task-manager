import { USER_SIGNIN, USER_ACTIVE_LOAD_DATA, USER_SIGNOUT } from './actions';

const initialState = {
  auth: false,
  token: null,
  userId: null,
  user: {}
};

export default function activeUserReducer (state = initialState, action) {
  switch(action.type) {
    case USER_SIGNIN:
      return {...state, auth: true, token: action.payload.token, userId: action.payload.userId };
    case USER_ACTIVE_LOAD_DATA:
      return {...state, user: action.payload};
    case USER_SIGNOUT:
      return {...state, auth: false, token: null, userId: null, user: {}};
    default:
      return state;
  }
}