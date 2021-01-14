import {
    TASK_CHECK,
    TASK_CHECK_ALL,
    TASK_UNCHECK_ALL,
    TASK_CREATE,
    TASK_REMOVE,
    TASK_EDIT, 
    TASK_LOAD,
    TASK_CLEAR
} from './actions';


const initialState = [];
  
  export default function tasksReducer (state = initialState, action) {
    switch (action.type) {
      case TASK_CHECK:
        let newTasksList = [...state];
        newTasksList.map(task => task._id === action.payload ? task.checked = !task.checked : task);
        return newTasksList;
      case TASK_CHECK_ALL:
        let checkedList = [...state];
        action.payload ?
          checkedList.map(task => task.checked = true) :
          checkedList.map(task => task.checked = false);
      return checkedList;
      case TASK_UNCHECK_ALL:
        let uncheckedList = [...state];
          uncheckedList.map(task => task.checked = false);
        return uncheckedList;
      case TASK_LOAD:
        return [
          ...state,
          ...action.payload
        ];
      case TASK_CREATE:
        return [
          ...state,
          action.payload
        ];
      case TASK_REMOVE:
        const newState = [...state].filter(task => task.checked === false);
        return newState;
      case TASK_EDIT:
        let taskList = [...state];
        let index = taskList.indexOf(taskList.find(task => task._id === action.payload._id));
        taskList.splice(index, 1, action.payload);
        return taskList;
      case TASK_CLEAR:
        return initialState;
      default:
        return state;
    }
  }