import React from "react";
import Form from "react-bootstrap/Form";
import {fetchData, responseHandler} from "../../../../../library/api/fetcher/middleware";
import {ListingsContext} from "../../../../Context/ListingsContext";

class ListingsFilterApiListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            checkedListItems: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.getApiListCallback = this.getApiListCallback.bind(this);
        this.getApiList = this.getApiList.bind(this);
    }
    componentDidMount() {
        this.getApiList()
    }

    getApiList() {
        // console.log(this.context.listingsData)
        let category = this.context.listingsData.listing_block_category.slug;
        fetchData("list", [category, this.props.data.api_endpoint], {}, this.getApiListCallback);
    }

    getApiListCallback(status, data) {
        this.setState({
            listItems: data.data
        })
    }

    formChangeHandler(e) {
        let list = this.state.checkedListItems;
        if (e.target.checked) {
            list.push(e.target.value)
        } else {
            let index = list.indexOf(e.target.value);
            if (index !== -1) list.splice(index, 1);
        }
        let data = {
            name: this.props.data.api_endpoint,
            value: list
        };
        this.props.onChangeCallback(data)
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
ListingsFilterApiListItem.contextType = ListingsContext;
export default ListingsFilterApiListItem;