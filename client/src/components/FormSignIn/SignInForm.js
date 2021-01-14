import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppLoader } from '../Loader/Loader';
import Alert from '../Alert/Alert';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSignIn(this.state);
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
                <span className="fontawesome-envelope input_icon"></span>
                <input id="user-email" type="text" value={this.state.email}
            onChange={this.handleUserInput} name="email" placeholder="Email" />
              </span>
              <span className="wrapper">
                <span className="fontawesome-lock input_icon"></span>
                <input id="user-password" type="password" value={this.state.password}
            onChange={this.handleUserInput} name="password" placeholder="Password" />
              </span>
              <p>
                <input className="button button-form" type="submit" onClick={this.onSubmit} value="Sign in" />
              </p>
            </fieldset>
          </form>
          <p>Don't have an account? &nbsp;&nbsp;<Link to="/signup">Sign up</Link>
            <span className="fontawesome-arrow-right link_icon"></span>
          </p>
        </div>
      </>
    );
  }
}

SignInForm.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default SignInForm;