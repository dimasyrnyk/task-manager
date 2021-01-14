import React from 'react';
import './User.css';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { AppLoader } from '../Loader/Loader';

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
}
  componentDidMount() {
    this.props.data.userLoadData({ _id: this.props.match.params.id, token: this.props.data.activeUser.token });

    setTimeout(() => {
      this.setState({ user: this.props.data.loadUser });
    }, 1000);
  }
  

  render() {
    if(this.props.data.loading) return <AppLoader />;

    if(!this.state.user._id) return <div className="user__container">Sorry, but the user was not found.</div>;

    const user = this.state.user;

    return (
      <div className="user__container">
        <div className="user__profile">
          <img src={'./.' + user.avatar} alt="User avatar" className="user__avatar" />
          <div className="user_description">
            <h3 className="user__title">{user.login}</h3>
            <p className="user__title">Email: {user.email}</p>
            <p>Created tasks <strong className="user__count">{this.state.user.ownTasks.length}</strong></p>
            <p>Received tasks <strong className="user__count">{this.state.user.otherTasks.length}</strong></p>
          </div>
        </div>
  
          <input
            type="submit"
            value="Back"
            className="control__button"
            onClick={() => this.props.history.goBack()}
          />
  
      </div>
   );
  }
}

User.propTypes = {
  data: PropTypes.object.isRequired
}

export default withRouter(User);