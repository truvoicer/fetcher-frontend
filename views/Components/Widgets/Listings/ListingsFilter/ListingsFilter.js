import React, {useState} from "react";
import ListingsFilterDateItem from "./Items/ListingsFilterDateItem";
import ListingsFilterTextItem from "./Items/ListingsFilterTextItem";
import ListingsFilterListItem from "./Items/ListingsFilterListItem";
import ListingsFilterApiListItem from "./Items/ListingsFilterApiListItem";
import {isSet} from "../../../../../library/utils";
import {connect} from "react-redux";

const ListingsFilter = (props) => {
    const controlPrefix = "filter_control_";

    const getDataList = (item) => {
        if (item.type === "list" && item.list_source === "wordpress") {
            return (
                <ListingsFilterListItem
                    controlPrefix={controlPrefix}
                    data={item}
                />
            );
        } else if (item.type === "list" && item.list_source === "api") {
            if (isSet(props.listings.listingsData.listing_block_category)) {
                return (
                    <ListingsFilterApiListItem
                        controlPrefix={controlPrefix}
                        data={item}
                    />
                )
            }
            return <p>Loading...</p>
        }
        return null
    }

    const getListingFilterData = () => {
        if (isSet(props.listings.listingsData.show_filters)) {
            return props.listings.listingsData.filters;
        }
        return false;
    }

    const listingsFilterData = getListingFilterData();
    // console.log(listingsFilterData)
    return (
        <>
            {listingsFilterData &&
            <div className={"listings-filters"}>
                <h3 className="h5 text-black mb-1 mt-3">Filters</h3>
                <form>
                    {listingsFilterData.listings_filters.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.type === "text" &&
                            <ListingsFilterTextItem
                                controlPrefix={controlPrefix}
                                data={item}
                            />
                            }
                            {item.type === "date" &&
                            <ListingsFilterDateItem
                                controlPrefix={controlPrefix}
                                data={item}
                            />
                            }
                            {item.type === "list" &&
                            getDataList(item)
                            }
                        </React.Fragment>
                    ))}
                </form>
            </div>
            }
        </>
    )
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