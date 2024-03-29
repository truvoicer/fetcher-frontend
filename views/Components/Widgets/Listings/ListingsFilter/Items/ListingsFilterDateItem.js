import React from "react";
import DatePicker from "react-datepicker";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

const dateFormat = require('dateformat');

class ListingsFilterDateItem extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            startDate: date,
            endDate: null,
            dateString: date.toLocaleString()
        };
        this.dateFormatString = "yyyymmdd";
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.onChangeCallback = this.onChangeCallback.bind(this)
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date,
        });
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.addListingsQueryDataString("start_date", dateFormat(date, this.dateFormatString))
    };

    handleEndDateChange(date) {
        this.setState({
            endDate: date,
        });
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        // this.onChangeCallback("start_date", dateFormat(this.dateFormatString, this.state.startDate))
        this.props.addListingsQueryDataString("end_date", dateFormat(date, this.dateFormatString))
    };

    onChangeCallback(name, value) {
        let data = {
            name: name,
            value: value
        };
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.onChangeCallback(data)
        this.props.addListingsQueryDataString(name, value)
    }

    render() {
        return (

            <div className={"form-group filter-date"}>
                <p className={"section-label"}>{this.props.data.label}</p>

                <label>Start Date:</label>
                <DatePicker
                    className={"filter-datepicker"}
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selectsStart
                />
                <label>End Date:</label>
                <DatePicker
                    className={"filter-datepicker"}
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selectsEnd
                />
            </div>
        )
    }
}

export default connect(
    null,
    {addListingsQueryDataString, setSearchRequestOperation: setSearchRequestOperationMiddleware}
)(ListingsFilterDateItem);