import React from 'react';
import TaskItem from '../TaskItem/TaskItem.js';
import PropTypes from 'prop-types';


function TaskList(props) {
    return (
        <ul className="task-manager__list">
            {props.tasks.map((task, index) => {
                return (
                    <TaskItem
                        task={task}
                        key={index}
                        onChange={props.onCheck}
                        onTaskUncheckAll={props.onTaskUncheckAll}
                    />
                )})
            }
        </ul>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCheck: PropTypes.func.isRequired,
    onTaskUncheckAll: PropTypes.func.isRequired
}

export default TaskList;