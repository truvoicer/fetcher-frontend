import React from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/actions/listings-actions";

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

        this.props.addListingsQueryDataString(e.target.name, e.target.value)
    }
    render() {
        return (
            <>
                <ul>
                    <li className={"listings-filter--item-control"}>
                        <input type={"text"}
                               name={this.props.data.name}
                               value={this.props.value && this.props.value[this.props.data.name]}
                               onChange={this.formChangeHandler}/>
                    </li>
                </ul>
            </>
        )
    }
}

export default connect(
    null,
    {addListingsQueryDataString}
)(ListingsFilterTextItem);