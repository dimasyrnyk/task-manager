import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOut } from './../../store/activeuser/actions';


function Header(props) {
    let userLink = `/user/${props.activeUser._id && props.activeUser._id}`;

    const signOut = () => {
        props.onSignOut();
        localStorage.removeItem('activeUser');
    }

    const navSignInFalse = (
    <nav>
        <ul>
            <li>
                <Link to="/signin">Sign in</Link>
            </li>
            <li>
                <Link to="/signup">Sign up</Link>
            </li>
        </ul>
    </nav>
    );

    const navSignInTrue = (
    <nav>
        <ul>
            <li>
                <Link to={userLink}>
                    <p id="active-user">{props.activeUser.login}</p>
                </Link>
            </li>
            <li>
                <Link to="/" onClick={signOut}>Sign out</Link>
            </li>
        </ul>
    </nav>
    );
    return (
        <header>
            <h1><Link to="/">Task Manager</Link></h1>
            { props.activeUser.login === undefined ? navSignInFalse : navSignInTrue }
        </header>
    );
}

Header.propTypes = {
    activeUser: PropTypes.object.isRequired
}

export default  connect(
    state => ({
      activeUser: state.activeUser.user
  }),
    dispatch => ({
      onSignOut: () => dispatch(userSignOut())
    })
  )(Header);