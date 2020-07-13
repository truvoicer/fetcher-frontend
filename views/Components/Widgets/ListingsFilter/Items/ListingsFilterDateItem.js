import React from "react";
import DatePicker from "react-datepicker";
const dateFormat = require('date-format');

class ListingsFilterDateItem extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            startDate: date,
            endDate: null,
            dateString: date.toLocaleString()
        };
        this.dateFormatString = "yyyyMMdd";
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.onChangeCallback = this.onChangeCallback.bind(this)
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date,
        });
        this.onChangeCallback("start_date", dateFormat(this.dateFormatString, date))
    };

    handleEndDateChange(date) {
        this.setState({
            endDate: date,
        });
        // this.onChangeCallback("start_date", dateFormat(this.dateFormatString, this.state.startDate))
        this.onChangeCallback("end_date", dateFormat(this.dateFormatString, date))
    };

    onChangeCallback(name, value) {
        let data = {
            name: name,
            value: value
        };
        this.props.onChangeCallback(data)
    }
    render() {
        return (
            <>
                <ul>
                    <li className={"listings-filter--item-control"}>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            selectsStart
                        />
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            selectsEnd
                        />
                    </li>
                </ul>
            </>
        )
    }
}

export default ListingsFilterDateItem;