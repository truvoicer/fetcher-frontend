import React from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware,
    loadNextOffsetMiddleware,
    loadNextPageNumberMiddleware
} from "../../../../../../redux/middleware/search-middleware";
import {
    APPEND_SEARCH_REQUEST,
    PAGE_CONTROL_CURRENT_PAGE,
    PAGE_CONTROL_HAS_MORE,
    SEARCH_REQUEST_COMPLETED,
} from "../../../../../../redux/constants/search-constants";
import InfiniteScroll from 'react-infinite-scroller';
import LoaderComponent from "../../../Loader";
import GridItem from "../../ListingsItems/GridItems";

const ListingsInfiniteScroll = (props) => {
    const loadMore = () => {
        if (this.props.search.searchStatus !== SEARCH_REQUEST_COMPLETED) {
            return false;
        }
        this.props.setSearchRequestOperationMiddleware(APPEND_SEARCH_REQUEST);
        this.props.loadNextPageNumberMiddleware(this.props.search.pageControls[PAGE_CONTROL_CURRENT_PAGE] + 1);
        // if (isSet(this.props.search.extraData.page_offset) && isSet(this.props.search.pageControls[PAGE_CONTROL_PAGE_SIZE])) {
        //     this.props.loadNextOffsetMiddleware(parseInt(this.props.search.extraData.page_offset) + parseInt(this.props.search.extraData.page_size));
        // }
    }

        // console.log(this.props.listings)
        // console.log(this.props.search)
        return (
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={loadMore}
                hasMore={props.search.pageControls[PAGE_CONTROL_HAS_MORE]}
                loader={<LoaderComponent key={"loader"}/>}
            >
                <GridItem/>
            </InfiniteScroll>

        )
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
        setSearchRequestStatusMiddleware,
        loadNextPageNumberMiddleware,
        loadNextOffsetMiddleware
    }
)(ListingsInfiniteScroll);