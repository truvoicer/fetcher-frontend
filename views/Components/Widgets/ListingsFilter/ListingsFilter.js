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
            listingFilters: [],
            location: "",
            name: "",
            date: ""
        }
        this.listingFilters = [];
        this.filterItem = this.filterItem.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }
    formChangeHandler(e) {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
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

    render() {
        // console.log(this.context)
        if(typeof this.context.listingsData.listing_block_category === "undefined") {
            return <p>Listings category not set/found</p>
        }
        let listingCategory = this.context.listingsData.listing_block_category.slug;
        this.listingFilters = this.props.data[listingCategory+"_listings_filters"]
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
                                    control={<input name={"location"}
                                                    id={"location_filter"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.location}
                                    />}/>
                                }
                                {item.filter === "name" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input name={"name"}
                                                    id={"location_filter"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.name}
                                    />}/>
                                }
                                {item.filter === "date" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input name={"date"}
                                                    id={"location_filter"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.date}
                                    />}/>
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