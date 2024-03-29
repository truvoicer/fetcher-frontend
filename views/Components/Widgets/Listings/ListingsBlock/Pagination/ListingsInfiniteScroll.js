import React from "react";
import {isSet} from "../../../../../../library/utils";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware,
    loadNextOffsetMiddleware,
    loadNextPageNumberMiddleware
} from "../../../../../../redux/middleware/search-middleware";
import {
    APPEND_SEARCH_REQUEST, NEW_SEARCH_REQUEST,
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_STARTED
} from "../../../../../../redux/constants/search-constants";
import InfiniteScroll from 'react-infinite-scroller';
import LoaderComponent from "../../../Loader";
import GridItem from "../../ListingsItems/GridItems";

class ListingsInfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: false,
        }
        this.loadMore = this.loadMore.bind(this)
    }

    loadMore() {
        if (this.props.search.searchStatus !== SEARCH_REQUEST_COMPLETED) {
            return false;
        }
        this.props.setSearchRequestOperationMiddleware(APPEND_SEARCH_REQUEST);
        if (isSet(this.props.search.extraData.page_offset) && isSet(this.props.search.extraData.page_size)) {
            this.props.loadNextOffsetMiddleware(parseInt(this.props.search.extraData.page_offset) + parseInt(this.props.search.extraData.page_size));
        } else if (isSet(this.props.search.extraData.page_number)) {
            this.props.loadNextPageNumberMiddleware(parseInt(this.props.search.extraData.page_number) + 1);
        }
    }

    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search)
        return (
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={this.loadMore}
                hasMore={this.props.search.hasMoreResults}
                loader={<LoaderComponent key={"loader"}/>}
            >
                <GridItem/>
            </InfiniteScroll>

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
        setSearchRequestStatusMiddleware,
        loadNextPageNumberMiddleware,
        loadNextOffsetMiddleware
    }
)(ListingsInfiniteScroll);