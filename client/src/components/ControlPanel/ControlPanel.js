import React from 'react';
import TaskEdit from '../../components/TaskEdit/TaskEdit.js';
import TaskRemove from '../../components/TaskRemove/TaskRemove.js';
import TaskAdd from '../../components/TaskAdd/TaskAdd.js';
import PropTypes from 'prop-types';


function ControlPanel(props) {
  return (
    <div className="task-manager__control-panel">
      { props.checkedTask === 1 &&
        <TaskEdit
        task={props.task}
        activeUser={props.activeUser}
        users={props.users}
        usersFetch={props.usersFetch}
        onEdit={props.onTaskEdit}
        />
      }
      { props.checkedTask > 0 &&
        <TaskRemove
          id={props.task._id}
          activeUser={props.activeUser}
          onRemove={props.onTaskRemove}
        />
      }
      <TaskAdd
        activeUser={props.activeUser}
        users={props.users}
        usersFetch={props.usersFetch}
        onCreate={props.onTaskAdd}
      />
    </div>
  );
}

ControlPanel.propTypes = {
  activeUser: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersFetch: PropTypes.func.isRequired,
  task: PropTypes.object,
  checkedTask: PropTypes.number.isRequired,
  onTaskAdd: PropTypes.func.isRequired,
  onTaskRemove: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired
}
  
  export default ControlPanel;