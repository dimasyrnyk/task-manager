import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { taskRemove, taskEdit } from './../../store/tasks/actions';
import { userSignIn, userSignUp } from './../../store/activeuser/actions';
import { userLoadData, usersFetch } from '../../store/users/actions';
import Home from '../../components/Home/Home.js';
import SignInForm from '../../components/FormSignIn/SignInForm.js';
import SignUpForm from '../../components/FormSignUp/SignUpForm.js';
import TaskManager from '../../containers/TaskManager/TaskManager.js';
import TaskFull from '../../components/TaskFull/TaskFull.js';
import User from '../../components/User/User.js';
import Alert from '../../components/Alert/Alert';


class Main extends React.Component {
  render() {
    
    if (this.props.activeUser.auth) {
      return(
        <main>
          { this.props.alertMessage && <Alert text={this.props.alertMessage.text} color={this.props.alertMessage.color} /> }
          <Switch>
            <Route path="/task-manager">
              <TaskManager checkedTask={this.props.checked} />
            </Route>
            <Route path="/task/:id" render={(props) => (
              <TaskFull {...props} data={{
                tasks: this.props.tasks,
                users: this.props.users,
                activeUser: this.props.activeUser,
                usersFetch: this.props.onUsersFetch,
                onTaskRemove: this.props.onTaskRemove,
                onTaskEdit: this.props.onTaskEdit
              }}/>
            )} />
            <Route path="/user/:id" render={(props) => (
              <User {...props} data={{
                loadUser: this.props.loadUser,
                activeUser: this.props.activeUser,
                userLoadData: this.props.onLoadUserData,
                loading: this.props.loading,
                tasks: this.props.tasks
              }} />
            )} />
            <Redirect to="/task-manager" />
          </Switch>
        </main>
      );
    }

    return(
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUpForm
              onSignUp={this.props.onSignUp}
              loading={this.props.loading}
              alertMessage={this.props.alertMessage}
            />
          </Route>
          <Route path="/signin">
            <SignInForm
              onSignIn={this.props.onSignIn}
              loading={this.props.loading}
              alertMessage={this.props.alertMessage}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

export default connect(
  state => ({
    activeUser: state.activeUser,
    users: state.users.users,
    loadUser: state.users.loadUser,
    tasks: state.tasks,
    checked: state.tasks.filter(task => task.checked).length,
    loading: state.app.loading,
    alertMessage: state.app.alert
  }),
  dispatch => ({
    onSignIn: (data) => dispatch(userSignIn(data)),
    onSignUp: (data) => dispatch(userSignUp(data)),
    onLoadUserData: (data) => dispatch(userLoadData(data)),
    onUsersFetch: (data) => dispatch(usersFetch(data)),
    onTaskRemove: (id) => dispatch(taskRemove(id)),
    onTaskEdit: (task) => dispatch(taskEdit(task))
  })
)(Main);