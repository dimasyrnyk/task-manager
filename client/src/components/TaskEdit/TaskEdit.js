import React from 'react';
import '../TaskAdd/Modal.css';
import ModalSelect from '../ModalSelect/ModalSelect.js';
import InputTitle from '../ModalInputs/InputTitle.js';
import InputEmail from '../ModalInputs/InputEmail.js';
import DeadlineSetter from '../DeadlineSetter/DeadlineSetter.js';
import PropTypes from 'prop-types';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserEmail = this.handleUserEmail.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getInitState(){
    return {
      isOpen: false,
      title: this.props.task.title,
      priority: this.props.task.priority,
      deadline: () => {
        const s = this.props.task.deadline.split("/");
        return [s[1],s[0],s[2]].join("/");
      },
      status: this.props.task.status,
      users: this.props.task.users,
      text: this.props.task.text
    };
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleUserEmail(value) {
    this.setState({users: value});
  }

  handleDatePicker(date) {
    this.setState({deadline: date});
  }

  onSubmit(e) {
    const editedTask = {
      _id: this.props.task._id,
      creator: this.props.task.creator,
      title: this.state.title,
      priority: this.state.priority,
      deadline: this.state.deadline,
      status: this.state.status,
      checked: false,
      users: this.state.users,
      text: this.state.text
    };
    
    this.props.onEdit({ token: this.props.activeUser.token, task: editedTask });
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <button className="control__button" onClick={() => this.setState({ isOpen: true })}>
          Edit
        </button>

        {this.state.isOpen && (
          <div className='modal'>
            <div className='modal__body'>
              <h3 className='modal__title'>Edit task</h3>
              <form className='modal__form'>
                <InputTitle
                  name={"Title"}
                  value={this.state.title}
                  onChange={this.handleUserInput}
                />
                <ModalSelect
                  name={"Priority"}
                  value={this.state.priority}
                  options={["High", "Medium", "Low"]}
                  onChange={this.handleUserInput}
                />
                <DeadlineSetter
                  onChange={this.handleDatePicker}
                  date={this.state.deadline()}
                />
                <InputEmail
                  activeUser={this.props.activeUser}
                  users={this.props.users}
                  usersFetch={this.props.usersFetch}
                  taskUsers={this.props.task.users}
                  onChange={this.handleUserEmail}
                />
                <ModalSelect
                  name={"Status"}
                  value={this.state.status}
                  options={["New", "Work on it", "Done", "Stuck"]}
                  onChange={this.handleUserInput}
                />
                <p className="modal__row">
                  <span className="row__title">Description: *</span>
                  <textarea
                    className="modal__textarea"
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleUserInput}
                    placeholder="Describe your task">
                  </textarea>
                </p>
              </form>
              <div className="modal__controls">
                <button className="control__button" onClick={this.onSubmit}>
                  Save changes
                </button>
                <button className="control__button" onClick={() => this.setState({ isOpen: false })}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

TaskEdit.propTypes = {
  task: PropTypes.object.isRequired,
  activeUser: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersFetch: PropTypes.func,
  onEdit: PropTypes.func.isRequired
}

export default TaskEdit;