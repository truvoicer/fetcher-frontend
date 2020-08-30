import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {fetchData} from "../../../../../../library/api/fetcher/middleware";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

const ListingsFilterApiListItem = (props) => {
    const [listItems, setListItems] = useState([]);

    const getApiList = () => {
        // console.log(props.listings.category)
        if (props.listings.category !== "") {
            fetchData("list", [props.listings.category, props.data.api_endpoint], {}, getApiListCallback);
        }
    }

    const getApiListCallback = (status, data) => {
        setListItems(data.data)
    }

    const formChangeHandler = (e) => {
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        if (e.target.checked) {
            props.addArrayItem(props.data.api_endpoint, e.target.value, true)
        } else {
            props.removeArrayItem(props.data.api_endpoint, e.target.value, true)
        }
    }

    return (
        <div className="form-group filter-list">
            <p className={"section-label"}>{props.data.label}</p>
            <ul className="list-unstyled">
                {listItems &&
                listItems.map((item, index) => (
                    <li key={"api_list_control_" + index.toString()}>
                        <Form.Check
                            type={"checkbox"}
                            label={item.provider_label}
                            id={props.controlPrefix + item.provider_name}
                            name={props.data.api_endpoint + "[]"}
                            value={item.provider_name}
                            onChange={formChangeHandler}
                        />
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(
    mapStateToProps,
    {
        addArrayItem,
        removeArrayItem,
        setSearchRequestOperationMiddleware
    }
)(ListingsFilterApiListItem);