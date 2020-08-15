import React from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware
} from "../../../../../redux/middleware/search-middleware";
import LoaderComponent from "../../Loader";
import RightSidebar from "../../../Sidebars/RightSidebar";
import ListingsSortBar from "./ListingsSortBar";
import Paginate from "./Pagination/ListingsPaginate";
import ListingsInfiniteScroll from "./Pagination/ListingsInfiniteScroll";

class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.search)
        return (
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={"listings-block"}>
                                {this.props.search.searchList.length > 0 ?
                                    <>
                                        <ListingsSortBar/>
                                        {this.props.listings.listingsData.load_more_type === "pagination" &&
                                        <Paginate/>
                                        }
                                        {this.props.listings.listingsData.load_more_type === "infinite_scroll" &&
                                        <ListingsInfiniteScroll />
                                        }
                                    </>
                                    :
                                    <LoaderComponent key={"loader"}/>
                                }
                            </div>
                        </div>
                        <div className="col-lg-3 ml-auto">
                            <RightSidebar/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        search: state.search
    };
}

export default connect(
    mapStateToProps,
    {
        addListingsQueryDataString,
        setSearchRequestOperationMiddleware,
        setSearchRequestStatusMiddleware
    }
)(ListingsBlock);