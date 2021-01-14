import { combineReducers } from 'redux';
import activeUserReducer from './activeuser/reducers';
import usersReducer from './users/reducers';
import tasksReducer from './tasks/reducers';
import appReducer from './app/reducers';

const rootReducer = combineReducers({
    activeUser: activeUserReducer,
    app: appReducer,
    users: usersReducer,
    tasks: tasksReducer
})

export default rootReducer;