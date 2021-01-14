import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TaskItem({ task, onChange, onTaskUncheckAll }) {
  
  let avatars = [...[task.creator]].concat([...task.users]).map((user, index) =>
    <Link to={`/user/${user._id}`} key={index}>
      <img src={user.avatar} alt="avatar" className="task-manager__avatar" />
    </Link>
  );

  const togleCheckTasks = () => {
    onTaskUncheckAll();
  }

  return (
    <li className="task-manager__item" key={task._id} >
      <input
        type="checkbox"
        checked={task.checked}
        className="task-manager__checkbox"
        onChange={() => onChange(task._id)}
      />
      <Link to={"/task/" + task._id} className="task-manager__name" onClick={togleCheckTasks}>
        <span>{task.title}</span>
      </Link>
      <span className={"task-manager__priority " + task.priority}>
        {task.priority}
      </span>
      <span className="task-manager__deadline">
        {task.deadline}
      </span>
      <span className="task-manager__users">
        {avatars}
      </span>
      <span className={"task-manager__status fontawesome-ok-sign " + task.status.replace(/\s/gi, "-")}>
        {" " + task.status}
      </span>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onTaskUncheckAll: PropTypes.func.isRequired
}

export default TaskItem;
