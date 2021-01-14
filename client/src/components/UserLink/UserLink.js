import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserLink(props) {
    return (
        <Link to={`/user/${props.user._id}`} className="task__user" key={props.key} >
            <img src={'./.' + props.user.avatar}
                alt="avatar"
                className="task-manager__avatar"
            />
            <span>{props.user.login}</span>
      </Link>
    );
}

UserLink.propTypes = {
    user: PropTypes.object.isRequired
  }

export default UserLink;