import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormErrors from './FormErrors.js';
import { AppLoader } from '../Loader/Loader.js';
import Alert from '../Alert/Alert.js';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      email: '',
      password: '',
      confirm: '',
      formErrors: {login: '', email: '', password: '', confirm: ''},
      loginValid: false,
      emailValid: false,
      passwordValid: false,
      confirmValid: false,
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
        () => { this.validateField(name, value) });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
        login: this.state.login,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
        avatar: "./task-manager/new_user.png"
    };
    this.props.onSignUp(newUser);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let loginValid = this.state.loginValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmValid = this.state.confirmValid;

  switch(fieldName) {
      case 'login':
        loginValid = value.match(/^([\w.%+-]{5,20})$/i);
        fieldValidationErrors.login = loginValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'confirm':
        confirmValid = this.state.password === this.state.confirm;
        fieldValidationErrors.confirm = confirmValid ? '': ' password';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    loginValid: loginValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confirmValid: confirmValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.loginValid &&
                              this.state.emailValid &&
                              this.state.passwordValid &&
                              this.state.confirmValid});
  }

  render() {
    if(this.props.loading) return <AppLoader />;

    return (
      <>
        { this.props.alertMessage && <Alert text={this.props.alertMessage.text} color={this.props.alertMessage.color} /> }
        <div className="user-form user-form-size">
          <form>
            <fieldset className="clearfix">
              <span className="wrapper">
                <span className="fontawesome-user input_icon"></span>
                <input id="user-login" type="text" value={this.state.login}
            onChange={this.handleUserInput} name="login" placeholder="Login" />
              <FormErrors formErrors={this.state.formErrors} name="login" />
              </span>
              <span className="wrapper">
                <span className="fontawesome-envelope input_icon"></span>
                <input id="user-email" type="text" value={this.state.email}
            onChange={this.handleUserInput} name="email" placeholder="Email" />
              <FormErrors formErrors={this.state.formErrors} name="email" />
              </span>
              <span className="wrapper">
                <span className="fontawesome-lock input_icon"></span>
                <input id="user-password" type="password" value={this.state.password}
            onChange={this.handleUserInput} name="password" placeholder="Password" />
              <FormErrors formErrors={this.state.formErrors} name="password" />
              </span>
              <span className="wrapper">
                <span className="fontawesome-lock input_icon"></span>
                <input id="user-password-confirm" type="password" value={this.state.confirm}
            onChange={this.handleUserInput} name="confirm" placeholder="Confirm password" />
              <FormErrors formErrors={this.state.formErrors} name="confirm" />
              </span>
              <p>
                <input className="button button-form" type="submit" onClick={this.onSubmit} value="Sign up" disabled={!this.state.formValid} />
              </p>
            </fieldset>
          </form>
          <p>Already have an account? &nbsp;&nbsp;<Link to="/signin">Sign in</Link>
            <span className="fontawesome-arrow-right link_icon"></span>
          </p>
        </div>
      </>
    );
  }
}

SignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default SignUpForm;