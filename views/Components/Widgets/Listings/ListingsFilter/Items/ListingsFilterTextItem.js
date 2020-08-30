import React, {useState} from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

const ListingsFilterTextItem = (props) => {
    const [query, setQuery] = useState();

    const formChangeHandler = (e) => {
        setQuery(e.target.value)
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        props.addListingsQueryDataString(props.data.name, e.target.value)
    }

    return (
        <div className={"form-group filter-text"}>
            <p className={"section-label"}>{props.data.label}</p>
            <input
                type={"text"}
                name={"query"}
                value={query}
                onChange={formChangeHandler}
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
)(ListingsFilterTextItem);