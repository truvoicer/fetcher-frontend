import React from "react";
import Form from "react-bootstrap/Form";
import {fetchData} from "../../../../../library/api/fetcher/middleware";
import {ListingsContext} from "../../../../Context/ListingsContext";

class ListingsFilterApiListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.getApiList = this.getApiList.bind(this);
    }
    componentDidMount() {
        if (this.props.data.list_source === "api") {
            this.getApiList()
        }
    }

    getApiList() {
        // console.log(this.props.data)
        // console.log(this.context)
        // // return <p>List</p>
        // if(typeof this.context.listingsData.listing_block_category === "undefined") {
        //     console.log("loading")
        //     return <p>Loading...</p>
        // }
        // let category = this.context.listingsData.listing_block_category.slug;
        // fetchData("list", [category, this.props.data.api_endpoint])
        //     .then((response) => {
        //         console.log(response)
        //         this.setState({
        //             listItems: response.data.data
        //         })
        //     }).catch((error) => {
        //     console.log(error)
        // })

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
                    {this.state.listItems &&
                    this.state.listItems.map((item, index) => (
                        <li className={"listings-filter--item-control"}
                            key={"api_list_control_" + index.toString()}>
                            <Form.Check
                                type={"checkbox"}
                                label={item.provider_label}
                                id={this.props.controlPrefix + item.provider_name}
                                name={item.provider_name + "[]"}
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