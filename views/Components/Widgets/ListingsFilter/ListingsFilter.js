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
            data: {
                location: "",
                name: "",
                date: ""
            }
        }
        this.listingFilters = [];
        this.filterItem = this.filterItem.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }
    formChangeHandler(e) {
        this.setState({
            data: {
                location: (e.target.name === "location") ? e.target.value : this.state.data.location,
                name: (e.target.name === "name") ? e.target.value : this.state.data.name,
                date: (e.target.name === "date") ? e.target.value : this.state.data.date,
            }
        })
        this.context.setListingsQueryData(this.state.data);
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
        if(typeof this.context.listingsData === "undefined") {
            return <p>Loading...</p>
        }
        if(typeof this.context.listingsData.listing_block_category === "undefined") {
            return <p>Loading...</p>
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

                            <li className={"listings-filter--item"} key={index}>
                                {item.filter === "location" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input name={"location"}
                                                    type={"text"}
                                                    id={"location_filter"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.data.location}
                                    />}/>
                                }
                                {item.filter === "name" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input name={"name"}
                                                    id={"name_filter"}
                                                    type={"text"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.data.name}
                                    />}/>
                                }
                                {item.filter === "date" &&
                                <ListingsFilterItem
                                    key={index}
                                    label={item.label}
                                    control={<input name={"date"}
                                                    id={"date_filter"}
                                                    type={"text"}
                                                    onChange={this.formChangeHandler}
                                                    value={this.state.data.date}
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