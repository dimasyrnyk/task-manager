import { showLoader, hideLoader, showAlert } from "../app/actions";

export const USERS_FETCH = 'USERS_FETCH';
export const USER_LOAD_DATA = 'USER_LOAD_DATA';



export function usersFetch(data) {
    return async dispatch => {
        const response = await fetch(`/api/user/filter/${data.value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || 'Something went wrong');
        } else {
            dispatch({ type: USERS_FETCH, payload: json });
        }
    }
}

export function userLoadData(data) {
    return async dispatch => {
        dispatch(showLoader());
        const response = await fetch(`/api/user/${data._id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            dispatch(showAlert({ text: json.message || 'Something went wrong', color: "alert_red" }));  
        } else {
            dispatch({ type: USER_LOAD_DATA, payload: json });
        }
        setTimeout(() => {
            dispatch(hideLoader());
        }, 1000);
    }
}

