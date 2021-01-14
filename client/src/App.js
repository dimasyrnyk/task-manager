import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Main from './containers/Main/Main.js';
import Footer from './containers/Footer/Footer.js';
import Header from './containers/Header/Header.js';
import { USER_SIGNIN, userActiveLoadData } from './store/activeuser/actions';


class App extends React.Component {

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('activeUser'));
    // localStorage.removeItem('activeUser');
    
    if (data && data.token) {
      this.props.resignIn({ token: data.token, userId: data.userId });
      this.props.loadActiveUserData({ token: data.token, userId: data.userId });
    }
  }

  render() {
    return (   
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    activeUser: state.activeUser,
  }),
  dispatch => ({
    resignIn: (data) => dispatch({ type: USER_SIGNIN, payload: data }),
    loadActiveUserData: (data) => dispatch(userActiveLoadData(data))
  })
)(App);
