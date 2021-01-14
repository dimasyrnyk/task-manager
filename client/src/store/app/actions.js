export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const showLoader = () => ({
    type: SHOW_LOADER
});

export const hideLoader = () => ({
    type: HIDE_LOADER
});

export const showAlert = text => {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        });

        setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
    }
};

export const hideAlert = () => ({
    type: HIDE_ALERT
});