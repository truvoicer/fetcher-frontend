import React from "react";
import {ListingsContext} from "../../../Context/ListingsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListingsFilterDateItem from "./Items/ListingsFilterDateItem";
import ListingsFilterTextItem from "./Items/ListingsFilterTextItem";
import ListingsFilterListItem from "./Items/ListingsFilterListItem";
import ListingsFilterApiListItem from "./Items/ListingsFilterApiListItem";
import {isSet} from "../../../../library/utils";
import {connect} from "react-redux";
import {buildListingsQueryData} from "../../../../redux/middleware/listings-middleware";

class ListingsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingFilters: [],
            controlPrefix: "filter_control_",
            data: {}
        }
        this.listingFilters = [];
        this.getListingFilterData = this.getListingFilterData.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.showControl = this.showControl.bind(this)
        this.getDataList = this.getDataList.bind(this)
    }

    formChangeHandler(e) {
        let data = this.state.data;
        data[e.name] = e.value;
        this.setState({
            data: data
        })
        this.props.buildListingsQueryData(data)
    }

    showControl(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }

    getDataList(item) {
        if (item.type === "list" && item.list_source === "wordpress") {
            return (
                <ListingsFilterListItem
                    controlPrefix={this.state.controlPrefix}
                    data={item}
                    value={this.state.data[item.name]}
                    onChangeCallback={this.formChangeHandler}/>
            );
        } else if (item.type === "list" && item.list_source === "api") {
            if (isSet(this.props.listings.listingsData.listing_block_category)) {
                return (
                    <ListingsFilterApiListItem
                        controlPrefix={this.state.controlPrefix}
                        data={item}
                        value={this.state.data[item.name]}
                        onChangeCallback={this.formChangeHandler}/>
                )
            }
            return <p>Loading...</p>
        }
        return null
    }

    getListingFilterData() {
        if (isSet(this.props.listings.listingsData.show_filters)) {
            return this.props.listings.listingsData.filters;
        }
        return false;
    }

    render() {
        const listingsFilterData = this.getListingFilterData();
        // console.log(listingsFilterData)
        return (
            <div id={"listings_filter"} className={"listings-filter"}>
                {listingsFilterData &&
                <>
                    <header className="major">
                        <h2>{listingsFilterData.filter_heading}</h2>
                    </header>
                    <form>
                        <ul>
                            {listingsFilterData.listings_filters.map((item, index) => (

                                <li className={"listings-filter--item"} key={index}>
                                    <span className="opener" onClick={this.showControl}>{item.label}</span>

                                    {item.type === "text" &&
                                    <ListingsFilterTextItem
                                        controlPrefix={this.state.controlPrefix}
                                        data={item}
                                        value={this.state.data[item.name]}/>
                                    }
                                    {item.type === "date" &&
                                    <ListingsFilterDateItem
                                        controlPrefix={this.state.controlPrefix}
                                        data={item}
                                        value={this.state.data[item.name]}/>
                                    }
                                    {item.type === "list" &&
                                        this.getDataList(item)
                                    }
                                </li>
                            ))}

                        </ul>
                    </form>
                </>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        listings: state.listings
    };
}

export default connect(
    mapStateToProps
)(ListingsFilter);