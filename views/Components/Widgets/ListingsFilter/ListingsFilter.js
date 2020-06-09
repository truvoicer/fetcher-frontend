import React from "react";
import {ListingsContext} from "../../../Context/ListingsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListingsFilterItem from "./ListingsFilterItem";

class ListingsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingType: this.props.data.listing_type,
            listingFilters: []
        }
        this.listingFilters = [];
        this.filterKey = this.props.data.listing_type + "_listings_filters";
        this.filterItem = this.filterItem.bind(this);
        this.getListingFilters = this.getListingFilters.bind(this);
    }

    filterItem(options) {
        return (
            options.show &&
            <div className={"listings-filter--item"}>
                <span>{options.label}</span>
                <div className={"listings-filter--item-control"}>

                </div>
            </div>
        )
    }

    getListingFilters() {
        let groupKey = this.props.data.listing_type + "_listings_filters";
        if (typeof this.props.data[groupKey] === "undefined") {
            return false;
        }
        return this.props.data[groupKey]
    }

    render() {
        this.listingFilters = this.props.data[this.filterKey]
        return (
            <div id={"listings_filter"} className={"listings-filter"}>
                <header className="major">
                    <h2>{this.props.data.listing_heading}</h2>
                </header>
                <form>
                    <ul>
                        {this.listingFilters.map((item, index) => (

                            <li className={"listings-filter--item"}>
                                {item.filter === "location" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input id={"location_filter"}/>}/>
                                }
                                {item.filter === "name" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input id={"location_filter"}/>}/>
                                }
                                {item.filter === "date" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input id={"location_filter"}/>}/>
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