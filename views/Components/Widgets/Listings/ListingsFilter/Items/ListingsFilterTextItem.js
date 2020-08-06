import React from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperation} from "../../../../../../redux/middleware/search-middleware";
import {NEW_SEARCH_REQUEST} from "../../../../../../redux/constants/search-constants";

class ListingsFilterTextItem extends React.Component {
    constructor(props) {
        super(props);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler(e) {
        let data = {
            name: e.target.name,
            value: e.target.value
        };

        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.addListingsQueryDataString(e.target.name, e.target.value)
    }

    render() {
        return (
            <div className={"form-group"}>
                <input type={"text"}
                       name={this.props.data.name}
                       value={this.props.value && this.props.value[this.props.data.name]}
                       onChange={this.formChangeHandler}/>
            </div>
        )
    }
}

export default connect(
    null,
    {addListingsQueryDataString, setSearchRequestOperation}
)(ListingsFilterTextItem);