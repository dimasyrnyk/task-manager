import { SHOW_LOADER, HIDE_LOADER, SHOW_ALERT, HIDE_ALERT } from './actions';

const initialState = {
    loading: false,
    alert: null
};

export default function appReducer (state = initialState, action) {
  switch(action.type) {
    case SHOW_LOADER:
      return {...state, loading: true};
    case HIDE_LOADER:
      return {...state, loading: false};
    case SHOW_ALERT:
      return {...state, alert: { text: action.payload.text, color: action.payload.color }};
    case HIDE_ALERT:
      return {...state, alert: null};
    default:
      return state;
  }
}