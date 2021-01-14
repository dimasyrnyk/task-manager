import React from 'react';
import PropTypes from 'prop-types';

function Alert({ text, color}) {
    return (
        <div className={"alert " + color}>
            {text}
        </div>
    )
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Alert;

