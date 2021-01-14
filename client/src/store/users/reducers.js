import { USERS_FETCH, USER_LOAD_DATA } from './actions';

const initialState = {
  users: [
    {
      login: "PetroMeleh",
      email: "petromeleh@gmail.com",
      password: "qwerty12345",
      avatar: './task-manager/new_user.png'
    }
  ],
  loadUser: {}
};

export default function usersReducer (state = initialState, action) {
  switch(action.type) {
    case USERS_FETCH:
      return {...state, users: action.payload};
    case USER_LOAD_DATA:
      return {...state, loadUser: action.payload};
    default:
      return state;
  }
}