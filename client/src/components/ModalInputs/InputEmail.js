import React from 'react';
import PropTypes from 'prop-types';


class InputEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterUser: '',
            taskUsers: this.props.taskUsers || [],
            showUsers: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    handleChange(e) {
        console.log("value", e.target.value);
        if(e.target.value !== '') this.props.usersFetch({ token: this.props.activeUser.token, value: e.target.value });

        this.setState({
            filterUser: e.target.value,
            showUsers: e.target.value.length > 0
        });
        const checkUser = this.props.users.filter(u => u.email === e.target.value.toLowerCase());
        if (checkUser.length > 0) {
            this.onAdd(checkUser[0]._id);
        }
    }

    onAdd(e) {
        const userValue = typeof e === 'string' ? e : e.target.id;
        console.log('this.props.users', this.props.users);
        const newUser = this.props.users.find(user => user.email === userValue);
        console.log('newUser', newUser);
        const newUsers = [
            ...this.state.taskUsers,
            {
                _id: newUser._id,
                login: newUser.login,
                email: newUser.email,
                avatar: newUser.avatar
            }
        ];
        console.log('newUsers', newUsers);
        this.setState({
            filterUser: '',
            taskUsers: newUsers,
            showUsers: false
        });
        this.props.onChange(newUsers);
    }

    onDelete(e) {
        const newUsers = [...this.state.taskUsers].filter(user =>
            user.email !== this.state.taskUsers[e.target.parentNode.id].email);
        this.setState({taskUsers: newUsers});
        this.props.onChange(newUsers);
    }

    render(){
        return (
            <span className="modal__row">
                <span className="row__title">Share with: *</span>
                <div className="modal__email">
                    { this.state.taskUsers.map((user, index) => 
                        <span className="modal__email_checked" id={index} key={index}>{user.email}
                            <i className="modal__email_remove fontawesome-trash" onClick={this.onDelete} />
                        </span>
                    )}
                    <input
                        className="modal__email_input"
                        type="text"
                        value={this.state.filterUser}
                        onChange={this.handleChange}
                        placeholder="Input email"
                    />
                </div>
                {
                    this.state.showUsers &&
                    <ul className="modal__email_users">
                    {
                        this.props.users.map((user, index) => {
                            return <li id={user.email} onClick={this.onAdd} key={index}>
                                        {user.email}
                                    </li>;
                        })
                    }
                    </ul>
                }
            </span>
        );
    }
}

InputEmail.propTypes = {
    activeUser: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    taskUsers: PropTypes.array,
    usersFetch: PropTypes.func,
    onChange: PropTypes.func.isRequired
}

export default InputEmail;