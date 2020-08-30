import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

const dateFormat = require('dateformat');

const ListingsFilterDateItem = (props) => {
    const dateFormatString = "yyyymmdd";
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)

    const handleStartDateChange = (date) => {
        setStartDate(date);
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        props.addListingsQueryDataString("start_date", dateFormat(date, dateFormatString))
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        // onChangeCallback("start_date", dateFormat(dateFormatString, state.startDate))
        props.addListingsQueryDataString("end_date", dateFormat(date, dateFormatString))
    };

    return (
        <div className={"form-group filter-date"}>
            <p className={"section-label"}>{props.data.label}</p>

            <label>Start Date:</label>
            <DatePicker
                className={"filter-datepicker"}
                selected={startDate}
                onChange={handleStartDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsStart
            />
            <label>End Date:</label>
            <DatePicker
                className={"filter-datepicker"}
                selected={endDate}
                onChange={handleEndDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsEnd
            />
        </div>
    )
}

export default connect(
    null,
    {
        addListingsQueryDataString,
        setSearchRequestOperationMiddleware
    }
)(ListingsFilterDateItem);