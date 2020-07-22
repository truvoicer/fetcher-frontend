import React from "react";
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem} from "../../../../../redux/actions/listings-actions";

class ListingsFilterListItem extends React.Component {
    constructor(props) {
        super(props);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler(e) {
        if (e.target.checked) {
            this.props.addArrayItem(this.props.data.name, e.target.value)
        }
        else {
            this.props.removeArrayItem(this.props.data.name, e.target.value)
        }
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.data.list_source === "wordpress" &&
                        this.props.data.list.map((item, index) => (
                                <li className={"listings-filter--item-control"}
                                    key={"list_control_" + index.toString()}>
                                    <Form.Check
                                        type={"checkbox"}
                                        label={item.label}
                                        id={this.props.controlPrefix + item.name}
                                        name={this.props.data.name + "[]"}
                                        value={item.name}
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
)(ListingsFilterListItem);