import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class DeadlineSetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.date ? this.props.date : new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })

        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        this.props.onChange(`${da}/${mo}/${ye}`);

        // let y = date.getFullYear();
        // let m = date.getMonth() + 1;
        // let d = date.getDate();
        // this.props.onChange(`${m > 9 ? m : "0" + m}/${d > 9 ? d : "0" + d}/${y} `);
    }

    render() {
        return (
            <span className="modal__row">
            <span className="row__title">Deadline: *</span>
                <DatePicker
                    id="date"
                    className="modal__select"
                    selected={Date.parse(this.state.startDate)}
                    onChange={this.handleChange}
                    name="startDate"
                    dateFormat="dd/MM/yyyy"
                />
            </span>
        );
    }
}

DeadlineSetter.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default DeadlineSetter;