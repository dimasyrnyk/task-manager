import React from 'react';
import './Modal.css';
import ModalSelect from '../ModalSelect/ModalSelect.js';
import InputTitle from '../ModalInputs/InputTitle.js';
import InputEmail from '../ModalInputs/InputEmail.js';
import DeadlineSetter from '../DeadlineSetter/DeadlineSetter.js';
import PropTypes from 'prop-types';

class TaskAdd extends React.Component {
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
      creator: '',
      title: '',
      priority: "High",
      deadline: '',
      status: 'New',
      users: [],
      text: ''
    };
  }

  componentDidMount() {
    const date = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    this.setState({ deadline: `${da}/${mo}/${ye}` });
  }



  handleUserInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUserEmail(value) {
    this.setState({ users: value });
  }

  handleDatePicker(date) {
    this.setState({ deadline: date });
  }

  onSubmit(e) {
    const creator = {
      _id: this.props.activeUser.user._id,
      login: this.props.activeUser.user.login,
      avatar: this.props.activeUser.user.avatar
    }

    const newTask = {
      creator: creator,
      title: this.state.title,
      priority: this.state.priority,
      deadline: this.state.deadline,
      status: this.state.status,
      checked: false,
      users: this.state.users,
      text: this.state.text
    };
    this.props.onCreate({ token: this.props.activeUser.token, task: newTask });
    this.setState(this.getInitState());
  }

  render() {
    return (
      <div>
        <button className="control__button" onClick={() => this.setState({ isOpen: true })}>
          Add task
        </button>

        {this.state.isOpen && (
          <div className='modal'>
            <div className='modal__body'>
              <h3 className='modal__title'>Add new task</h3>
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
                />
                <InputEmail
                  activeUser={this.props.activeUser}
                  users={this.props.users}
                  usersFetch={this.props.usersFetch}
                  onChange={this.handleUserEmail}
                />
                <ModalSelect
                  name={"Status"}
                  value={this.state.status}
                  options={["New", "Work on it", "Done", "Stuck"]}
                  onChange={this.handleUserInput}
                />
                <span className="modal__row">
                  <span className="row__title">Description: *</span>
                  <textarea
                    className="modal__textarea"
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleUserInput}
                    placeholder="Describe your task">
                  </textarea>
                </span>
              </form>
              <div className="modal__controls">
                <button className="control__button" onClick={this.onSubmit}>
                  Add task
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

TaskAdd.propTypes = {
  activeUser: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersFetch: PropTypes.func,
  onCreate: PropTypes.func.isRequired
}

export default TaskAdd; 