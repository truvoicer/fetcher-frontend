import React from "react";
import {ListingsContext} from "../../../Context/ListingsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListingsFilterDateItem from "./Items/ListingsFilterDateItem";
import ListingsFilterTextItem from "./Items/ListingsFilterTextItem";
import ListingsFilterListItem from "./Items/ListingsFilterListItem";

class ListingsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingType: this.props.data.listing_type,
            listingFilters: [],
            controlPrefix: "filter_control_",
            data: {}
        }
        this.listingFilters = [];
        this.getListingFilters = this.getListingFilters.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.showControl = this.showControl.bind(this)
    }
    formChangeHandler(e) {
        let data = this.state.data;
        data[e.name] = e.value;
        this.setState({
            data: data
        })

        let listingsQueryData = this.context.listingsQueryData;
        listingsQueryData[e.name] = e.value;
        this.context.setListingsQueryData(listingsQueryData);
    }

    showControl(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }

    getListingFilters() {
        return this.props.data.listings_filters
    }

    render() {
        this.listingFilters = this.getListingFilters()
        return (
            <div id={"listings_filter"} className={"listings-filter"}>
                <header className="major">
                    <h2>{this.props.data.listing_heading}</h2>
                </header>
                <form>
                    <ul>
                        {this.listingFilters.map((item, index) => (

                            <li className={"listings-filter--item"} key={index}>
                                <span className="opener" onClick={this.showControl}>{item.label}</span>

                                {item.type === "text" &&
                                <ListingsFilterTextItem
                                    controlPrefix={this.state.controlPrefix}
                                    data={item}
                                    value={this.state.data[item.name]}
                                    onChangeCallback={this.formChangeHandler} />
                                }
                                {item.type === "date" &&
                                <ListingsFilterDateItem
                                    controlPrefix={this.state.controlPrefix}
                                    data={item}
                                    value={this.state.data[item.name]}
                                    onChangeCallback={this.formChangeHandler} />
                                }
                                {item.type === "list" &&
                                <ListingsFilterListItem
                                    controlPrefix={this.state.controlPrefix}
                                    data={item}
                                    value={this.state.data[item.name]}
                                    onChangeCallback={this.formChangeHandler} />
                                }
                            </li>
                        ))}

                    </ul>
                </form>
            </div>
        )
    }
}

ListingsFilter.contextType = ListingsContext;
export default ListingsFilter;