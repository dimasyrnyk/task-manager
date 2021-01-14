import { showLoader, hideLoader, showAlert } from "../app/actions";
import { taskLoad, taskClear } from "../tasks/actions";

export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const USER_ACTIVE_LOAD_DATA = 'USER_ACTIVE_LOAD_DATA';


export const userSignOut = () => {
    return dispatch => {
        dispatch({ type: USER_SIGNOUT });
        dispatch(taskClear());
    }
}


export function userSignUp(data) {
    return async dispatch => {
        dispatch(showLoader());
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            dispatch(hideLoader());
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" })); 
        } else {
            dispatch(userSignIn({ email: data.email, password: data.password}));
            dispatch(hideLoader());
            dispatch(showAlert({ text: json.message, color: "alert_green" }));
        }
    }
}

export function userSignIn(data) {
    return async dispatch => {
        dispatch(showLoader());
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const json = await response.json();
    
        if (!response.ok) {
            dispatch(hideLoader());
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" }));            
        } else {
            dispatch({ type: USER_SIGNIN, payload: { userId: json.userId, token: json.token } });
            localStorage.setItem('activeUser', JSON.stringify({
                userId: json.userId, token: json.token
            }));
            dispatch(userActiveLoadData(json));
            dispatch(hideLoader());
            dispatch(showAlert({ text: json.message, color: "alert_green" }));
        }
    }
}

export function userActiveLoadData(data) {
    return async dispatch => {
        const response = await fetch(`/api/auth/${data.userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });

        const json = await response.json();
    
        if (!response.ok) {
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" }));
        } else {
            dispatch({ type: USER_ACTIVE_LOAD_DATA, payload: json });
            dispatch(taskLoad(data));
        }
    }
}