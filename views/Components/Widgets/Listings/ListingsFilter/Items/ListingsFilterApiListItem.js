import React from "react";
import Form from "react-bootstrap/Form";
import {fetchData} from "../../../../../../library/api/fetcher/middleware";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

class ListingsFilterApiListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.getApiListCallback = this.getApiListCallback.bind(this);
        this.getApiList = this.getApiList.bind(this);
    }

    componentDidMount() {
        this.getApiList()
    }

    getApiList() {
        console.log(this.props.listings.category)
        if (this.props.listings.category !== "") {
            fetchData("list", [this.props.listings.category, this.props.data.api_endpoint], {}, this.getApiListCallback);
        }
    }

    getApiListCallback(status, data) {
        this.setState({
            listItems: data.data
        })
    }

    formChangeHandler(e) {
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        if (e.target.checked) {
            this.props.addArrayItem(this.props.data.api_endpoint, e.target.value, true)
        } else {
            this.props.removeArrayItem(this.props.data.api_endpoint, e.target.value, true)
        }
    }

    render() {
        return (
                <div className="form-group filter-list">
                    <p className={"section-label"}>{this.props.data.label}</p>
                    <ul className="list-unstyled">
                        {this.state.listItems &&
                        this.state.listItems.map((item, index) => (
                            <li key={"api_list_control_" + index.toString()}>
                                <Form.Check
                                    type={"checkbox"}
                                    label={item.provider_label}
                                    id={this.props.controlPrefix + item.provider_name}
                                    name={this.props.data.api_endpoint + "[]"}
                                    value={item.provider_name}
                                    onChange={this.formChangeHandler}
                                />
                            </li>
                        ))
                        }
                    </ul>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(
    mapStateToProps,
    {addArrayItem, removeArrayItem, setSearchRequestOperation: setSearchRequestOperationMiddleware}
)(ListingsFilterApiListItem);