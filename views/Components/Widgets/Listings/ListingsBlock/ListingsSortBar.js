import {connect} from "react-redux";
import {
    addListingsQueryDataString,
    setListingsGridMiddleware
} from "../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware
} from "../../../../../redux/middleware/search-middleware";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import React from "react";
import {NEW_SEARCH_REQUEST} from "../../../../../redux/constants/search-constants";
import {fetcherApiConfig} from "../../../../../config/fetcher-api-config";
import MenuItem from "@material-ui/core/MenuItem";
import {
    LISTINGS_GRID_COMPACT,
    LISTINGS_GRID_DETAILED,
    LISTINGS_GRID_LIST
} from "../../../../../redux/constants/listings-constants";


class ListingsSortBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            grid: LISTINGS_GRID_COMPACT,
            limitSelectOptions: [
                {value: 10, label: 10},
                {value: 50, label: 50},
                {value: 100, label: 100},
            ],
            gridSelectOptions: [
                {value: LISTINGS_GRID_COMPACT, label: "Compact"},
                {value: LISTINGS_GRID_LIST, label: "List"},
                {value: LISTINGS_GRID_DETAILED, label: "Detailed"},
            ]
        }
        this.limitChangeHandler = this.limitChangeHandler.bind(this)
        this.gridChangeHandler = this.gridChangeHandler.bind(this)
    }

    limitChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        this.props.addListingsQueryDataString(fetcherApiConfig.searchLimitKey, e.target.value, true)
    }

    gridChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.setListingsGridMiddleware(e.target.value)
    }

    render() {
        return (
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <div className={"sort-bar"}>
                        <ul>
                            <li className={"col-sm-12 col-md-3 col-lg-1"}>
                                <FormControl className={"sort-bar--form-control"}>
                                    <InputLabel id="sort-bar-limit-input-label">Limit</InputLabel>
                                    <Select
                                        labelId="sort-bar-limit-label"
                                        id="sort-bar-limit-select"
                                        name="limit"
                                        value={this.state.limit}
                                        onChange={this.limitChangeHandler}
                                    >
                                        {this.state.limitSelectOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </li>
                            <li className={"col-sm-12 col-md-3 col-lg-1"}>
                                <FormControl className={"sort-bar--form-control"}>
                                    <InputLabel id="sort-bar-grid-input-label">Grid</InputLabel>
                                    <Select
                                        labelId="sort-bar-grid-label"
                                        id="sort-bar-grid-select"
                                        name={"grid"}
                                        value={this.state.grid}
                                        onChange={this.gridChangeHandler}
                                    >
                                        {this.state.gridSelectOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default connect(
    null,
    {
        addListingsQueryDataString,
        setSearchRequestOperationMiddleware,
        setSearchRequestStatusMiddleware,
        setListingsGridMiddleware
    }
)(ListingsSortBar);
