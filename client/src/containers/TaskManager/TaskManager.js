import React from 'react';
import { connect } from 'react-redux';
import './TaskManager.css';
import TaskList from '../../components/TaskList/TaskList.js';
import ControlPanel from '../../components/ControlPanel/ControlPanel.js';
import { taskCheck, taskCheckAll, taskUncheckAll, taskCreate, taskEdit, taskRemove } from './../../store/tasks/actions';
import { usersFetch } from '../../store/users/actions';

class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.checkAllTask = this.checkAllTask.bind(this);
  }
    
  checkAllTask(e) {
    this.props.onTaskCheckAll(e.target.checked);
  }

  render() {
    return (
        <div className="task-manager">
          <ControlPanel
            task={this.props.task}
            checkedTask={this.props.checkedTask}
            activeUser={this.props.activeUser}
            users={this.props.users}
            usersFetch={this.props.onUsersFetch}
            onTaskAdd={this.props.onTaskAdd}
            onTaskRemove={this.props.onTaskRemove}
            onTaskEdit={this.props.onTaskEdit}
          />
          <div className="task-manager__header">
            <input type="checkbox" className="task-manager__checkbox" onChange={this.checkAllTask} />
            <span className="task-manager__name">Task name</span>
            <span className="task-manager__priority">Priority</span>
            <span className="task-manager__deadline">Deadline</span>
            <span className="task-manager__users">Users</span>
            <span className="task-manager__status">Status</span>
          </div>
          {this.props.tasks.length ?
            <TaskList
              tasks={this.props.tasks}
              onCheck={this.props.onTaskCheck}
              onTaskUncheckAll={this.props.onTaskUncheckAll}
            /> :
            <p className="task-manager__deadline">No tasks!</p>
          }
        </div>
    );
  }
}

export default connect(
  state => ({
    activeUser: state.activeUser,
    users: state.users.users,
    tasks: state.tasks,
    task: state.tasks.find(task => task.checked === true)
  }),
  dispatch => ({
    onUsersFetch: (data) => dispatch(usersFetch(data)),
    onTaskCheck: (id) => dispatch(taskCheck(id)),
    onTaskCheckAll: (value) => dispatch(taskCheckAll(value)),
    onTaskUncheckAll: () => dispatch(taskUncheckAll()),
    onTaskAdd: (data) => dispatch(taskCreate(data)),
    onTaskRemove: (id) => dispatch(taskRemove(id)),
    onTaskEdit: (task) => dispatch(taskEdit(task))
  })
)(TaskManager);