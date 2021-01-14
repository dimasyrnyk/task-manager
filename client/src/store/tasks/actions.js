import { showAlert } from "../app/actions";

export const TASK_CHECK = 'TASK_CHECK';
export const TASK_CHECK_ALL = 'TASK_CHECK_ALL';
export const TASK_UNCHECK_ALL = 'TASK_UNCHECK_ALL';
export const TASK_LOAD = 'TASK_LOAD';
export const TASK_CREATE = 'TASK_CREATE';
export const TASK_EDIT = 'TASK_EDIT';
export const TASK_REMOVE = 'TASK_REMOVE';
export const TASK_CLEAR = 'TASK_CLEAR';

export const taskCheck = id => ({
    type: TASK_CHECK,
    payload: id 
});

export const taskCheckAll = value => ({
    type: TASK_CHECK_ALL,
    payload: value
});

export const taskUncheckAll = () => ({
    type: TASK_UNCHECK_ALL
});

export const taskClear = () => ({
    type: TASK_CLEAR
});


export function taskLoad(data) {
    return async dispatch => {
        const response = await fetch('/api/task', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || 'Something went wrong');
        } else {
            dispatch({ type: TASK_LOAD, payload: json });
        }
    }
}

export function taskCreate(data) {
    return async dispatch => {
        const response = await fetch('/api/task/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
            body: JSON.stringify(data.task)
        });

        const json = await response.json();

        if (!response.ok) {
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" }));  
        } else {
            dispatch({ type: TASK_CREATE, payload: json.task });
            dispatch(showAlert({ text: json.message, color: "alert_green" }));  
        }
    }
}

export function taskEdit(data) {
    return async dispatch => {
        const response = await fetch(`/api/task/edit/${data.task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`
            },
            body: JSON.stringify(data.task)
        });

        const json = await response.json();

        if (!response.ok) {
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" }));  
        } else {
            dispatch({ type: TASK_EDIT, payload: data.task });
            dispatch(showAlert({ text: json.message, color: "alert_green" }));  
        }
    }
}

export function taskRemove(data) {
    console.log('token', data.token);
    console.log('id', data._id);
    return async dispatch => {
        const response = await fetch(`/api/task/delete/${data._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${data.token}`
            },
        });
        console.log('response', response);

        const json = await response.json();
        console.log('json', json);
        if (!response.ok) {
            throw new Error(json.message || 'Something went wrong');
        } else {
            dispatch({ type: TASK_REMOVE });
        }
    }
}