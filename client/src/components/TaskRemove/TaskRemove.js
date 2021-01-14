import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function TaskRemove(props) {
    const onSubmit = () =>  {
        props.onRemove({ token: props.activeUser.token, _id: props.id });
    }

    return (
        <div>
            <Link to='/task-manager'>
                <button className="control__button" onClick={onSubmit}>
                    Delete
                </button>
            </Link>
      </div>
    );
}

TaskRemove.propTypes = {
  activeUser: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default TaskRemove;