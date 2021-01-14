import React from 'react';
import PropTypes from 'prop-types';


function ModalSelect(props) {
    return (
        <span className="modal__row">
        <span className="row__title">{props.name}: </span>
            <select
                className="modal__select"
                name={props.name.toLowerCase()}
                value={props.value}
                onChange={props.onChange}
            >
            {  
                props.options.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>;
                })
            }
            </select>
        </span>
    );
}

ModalSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ModalSelect;