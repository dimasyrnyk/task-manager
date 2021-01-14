import React from 'react';
import './TaskFull.css';
import { Link } from 'react-router-dom';
import TaskEdit from '../../components/TaskEdit/TaskEdit.js';
import TaskRemove from '../../components/TaskRemove/TaskRemove.js';
import UserLink from '../../components/UserLink/UserLink.js';
import PropTypes from 'prop-types';

function TaskFull(props) {
    const fullTask = [...props.data.tasks].find(task => task._id === props.match.params.id);

    const getTask = () => {
        return fullTask;
    }

    const onClose = () => {
        fullTask.checked = false;
        return fullTask;
    }

    if (!fullTask) {
        return <div className="task__container">Sorry, but the task was not found.</div>
    }
  
    return (
        <div className="task__container">
            <h2 className="task__title">
                {fullTask.title}
                <span className={"task__priority " + fullTask.priority}>
                    {fullTask.priority}
                </span>
            </h2>
            <div>
                <p className="task__deadline">
                    Deadline:
                    <span>{fullTask.deadline}</span>
                </p>
                <p className="task__users">
                    Creator:
                    <span>
                        { <UserLink user={fullTask.creator} /> }
                    </span>
                </p>
                <p className="task__users">
                    Users:
                    <span>
                        {
                            fullTask.users.map((user, index) => <UserLink user={user} key={index} />)
                        }
                    </span>
                </p>
                <p className="task__status">
                    Status:
                    <span className={"fontawesome-ok-sign " + fullTask.status.replace(/\s/gi, "-")}>
                        {" " + fullTask.status}
                    </span>
                </p>
            </div>
            <p className="task__description">
                {fullTask.text}
            </p>
            <div className="task__controls">
                <TaskEdit
                    task={getTask()}
                    activeUser={props.data.activeUser}
                    users={props.data.users}
                    usersFetch={props.data.usersFetch}
                    onEdit={props.data.onTaskEdit}
                />
                <TaskRemove
                    id={props.match.params.id}
                    activeUser={props.data.activeUser}
                    onRemove={props.data.onTaskRemove}
                />

                <Link to='/task-manager'>
                    <button className="control__button" onClick={onClose}>
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

TaskFull.propTypes = {
    data: PropTypes.object.isRequired
  }

export default TaskFull;