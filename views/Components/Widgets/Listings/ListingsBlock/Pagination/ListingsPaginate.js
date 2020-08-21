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
    APPEND_SEARCH_REQUEST,
    NEW_SEARCH_REQUEST,
    PAGE_CONTROL_CURRENT_PAGE, PAGE_CONTROL_PAGE_SIZE,
    PAGE_CONTROL_TOTAL_ITEMS,
    PAGE_CONTROL_TOTAL_PAGES,
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
        this.props.loadNextPageNumberMiddleware(pageNumber);
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
        const pageControls = this.props.search.pageControls;
        if (pageControls[PAGE_CONTROL_TOTAL_ITEMS] === 0) {
            return null;
        }

        let range = this.getPaginationRange(pageControls[PAGE_CONTROL_CURRENT_PAGE]);

        return (
            <div className="col-12 mt-5 text-center">
                <div className="pagination">

                    {pageControls[PAGE_CONTROL_CURRENT_PAGE] > this.state.paginationLimit - this.state.paginationRange &&
                    <a onClick={this.PaginationClickHandler.bind(this, 1)}>1</a>}
                    {range.map((num, index) => (
                        <React.Fragment key={index.toString()}>
                            {num === pageControls[PAGE_CONTROL_CURRENT_PAGE]
                                ?
                                <span>{num}</span>
                                :
                                <a onClick={this.PaginationClickHandler.bind(this, num)}>{num}</a>
                            }
                        </React.Fragment>
                    ))}
                    <span className="more-page">...</span>
                    <a onClick={this.PaginationClickHandler.bind(this, pageControls[PAGE_CONTROL_TOTAL_PAGES])}>
                        {pageControls[PAGE_CONTROL_TOTAL_PAGES]}
                    </a>
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