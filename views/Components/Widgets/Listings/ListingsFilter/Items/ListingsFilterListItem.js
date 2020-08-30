import React from "react";
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

const ListingsFilterListItem = (props) => {

    const formChangeHandler = (e) => {
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        if (e.target.checked) {
            props.addArrayItem(props.data.name, e.target.value, true)
        } else {
            props.removeArrayItem(props.data.name, e.target.value, true)
        }
    }

    return (
        <div className="form-group filter-list">
            <ul className="list-unstyled">
                <p className={"section-label"}>{props.data.label}</p>
                {props.data.list_source === "wordpress" &&
                props.data.list.map((item, index) => (

                    <li key={"list_control_" + index.toString()}>
                        <Form.Check
                            type={"checkbox"}
                            label={item.label}
                            id={props.controlPrefix + item.name}
                            name={props.data.name + "[]"}
                            value={item.name}
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
)(ListingsFilterListItem);