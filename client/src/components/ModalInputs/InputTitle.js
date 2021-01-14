import React from 'react';
import PropTypes from 'prop-types';


function InputTitle(props) {
    return (
        <span className="modal__row">
        <span className="row__title">{props.name}: *</span>
            <input
                className="modal__input"
                type="text"
                name={props.name.toLowerCase()}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.name}
            />
        </span>
    );
}

InputTitle.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputTitle;