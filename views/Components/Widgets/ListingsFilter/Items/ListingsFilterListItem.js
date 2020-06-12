import React from "react";
import Form from "react-bootstrap/Form";
import {fetchData} from "../../../../../library/api/fetcher/middleware";
import {ListingsContext} from "../../../../Context/ListingsContext";

class ListingsFilterListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.getApiList = this.getApiList.bind(this);
    }

    getApiList() {

        if(typeof this.context.listingsData.listing_block_category === "undefined") {
            return <p>Loading...</p>
        }
        let category = this.context.listingsData.listing_block_category.slug;
        console.log(fetchData("list", [category, this.props.data.api_endpoint]))
        // fetchData("list", [category, this.props.data.api_endpoint]).then((response) => {
        //     console.log(response)
        // })
        return <li>Api List</li>
    }

    formChangeHandler(e) {
        let list = this.state.listItems;
        if (e.target.checked) {
            list.push(e.target.value)
        } else {
            let index = list.indexOf(e.target.value);
            if (index !== -1) list.splice(index, 1);
        }
        this.setState({
            listItems: list
        })
        let data = {
            name: e.target.name,
            value: list
        };
        this.props.onChangeCallback(data)
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.data.list_source === "wordpress"
                        ?
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
                        :
                        <this.getApiList/>
                    }
                </ul>
            </>
        )
    }
}
ListingsFilterListItem.contextType = ListingsContext;
export default ListingsFilterListItem;