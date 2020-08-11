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
import GridItem from "../../ListingsItems/GridItems";

class ListingsPaginate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationLimit: 10,
            paginationRange: 4,
        }
        this.PaginationClickHandler = this.PaginationClickHandler.bind(this)
        this.getPagination = this.getPagination.bind(this)
    }

    PaginationClickHandler(pageNumber) {
        this.props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        if (isSet(this.props.search.extraData.page_offset) && isSet(this.props.search.extraData.page_size)) {
            this.props.loadNextOffsetMiddleware(this.getOffsetFromPageNUmber(pageNumber));
        } else if (isSet(this.props.search.extraData.page_number)) {
            this.props.loadNextPageNumberMiddleware(pageNumber);
        }
    }

    getOffsetFromPageNUmber(pageNumber) {
        return parseInt(this.props.search.extraData.page_size) * parseInt(pageNumber);
    }

    getCurrentPageFromOffset(totalItems, totalPageCount, pageSize, pageOffset) {
        let offsetPageCount = Math.floor(totalItems - pageOffset)
        if (pageOffset === 0) {
            return Math.floor(totalPageCount - Math.floor(totalItems / pageSize)) + 1;
        } else {
            return Math.floor(totalPageCount - Math.floor((offsetPageCount / pageSize)));
        }
    }
    getPaginationRange(currentPage) {
        let range = [];
        if (currentPage > this.state.paginationLimit - this.state.paginationRange) {
            for (let i = currentPage - this.state.paginationRange; i < currentPage; i++) {
                range.push(i)
            }
            for (let i = currentPage; i <= currentPage + this.state.paginationRange; i++) {
                range.push(i)
            }
        } else {
            for (let i = 1; i <= this.state.paginationLimit; i++) {
                range.push(i)
            }
        }
        return range;
    }

    getPagination() {
        const extraData = this.props.search.extraData;
        if (extraData.total_items === "") {
            return null;
        }

        let currentPage;
        let totalPageCount
        if (isSet(extraData.page_number)) {
            currentPage = parseInt(extraData.page_number);
            totalPageCount = parseInt(extraData.page_count);
        } else if (isSet(extraData.page_offset) && isSet(extraData.page_size)) {
            totalPageCount = Math.floor(extraData.total_items / extraData.page_size);
            currentPage = this.getCurrentPageFromOffset(extraData.total_items, totalPageCount, extraData.page_size, extraData.page_offset)
        }

        let range = this.getPaginationRange(currentPage);

        return (
            <div className="col-12 mt-5 text-center">
                <div className="pagination">

                    {currentPage > this.state.paginationLimit - this.state.paginationRange &&
                    <a onClick={this.PaginationClickHandler.bind(this, 1)}>1</a>}
                    {range.map((num, index) => (
                        <React.Fragment key={index.toString()}>
                            {num === currentPage
                                ?
                                <span>{num}</span>
                                :
                                <a onClick={this.PaginationClickHandler.bind(this, num)}>{num}</a>
                            }
                        </React.Fragment>
                    ))}
                    <span className="more-page">...</span>
                    <a onClick={this.PaginationClickHandler.bind(this, totalPageCount)}>{totalPageCount}</a>
                </div>
            </div>
        )
    }


    render() {
        return (
            <>
                <GridItem/>
                <this.getPagination/>
            </>
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
        loadNextOffsetMiddleware,
        loadNextPageNumberMiddleware
    }
)(ListingsPaginate);