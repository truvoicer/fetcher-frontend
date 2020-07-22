import React from "react";
import Form from "react-bootstrap/Form";
import {fetchData} from "../../../../../library/api/fetcher/middleware";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem} from "../../../../../redux/actions/listings-actions";

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
        let category = this.props.listings.listingsData.listing_block_category;
        fetchData("list", [category, this.props.data.api_endpoint], {}, this.getApiListCallback);
    }

    getApiListCallback(status, data) {
        this.setState({
            listItems: data.data
        })
    }

    formChangeHandler(e) {
        if (e.target.checked) {
            this.props.addArrayItem(this.props.data.api_endpoint, e.target.value)
        }
        else {
            this.props.removeArrayItem(this.props.data.api_endpoint, e.target.value)
        }
    }
    render() {
        return (
            <>
                <ul>
                    {this.state.listItems &&
                    this.state.listItems.map((item, index) => (
                        <li className={"listings-filter--item-control"}
                            key={"api_list_control_" + index.toString()}>
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
            </>
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
    {addArrayItem, removeArrayItem}
)(ListingsFilterApiListItem);