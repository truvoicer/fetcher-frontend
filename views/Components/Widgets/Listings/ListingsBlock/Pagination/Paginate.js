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

class Paginate extends React.Component {
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
            this.props.loadNextOffsetMiddleware(this.props.search.extraData.page_offset, this.props.search.extraData.page_size);
        } else if (isSet(this.props.search.extraData.page_number)) {
            this.props.loadNextPageNumberMiddleware(pageNumber);
        }
    }

    getPagination() {
        let pageNumber = parseInt(this.props.search.extraData.page_number);
        let pageSize = this.props.search.extraData.page_size;
        let totalItems = parseInt(this.props.search.extraData.total_items);
        let apiPageCount = this.props.search.extraData.page_count

        let range = [];
        if (pageNumber > this.state.paginationLimit - this.state.paginationRange) {
            for (let i = pageNumber - this.state.paginationRange; i < pageNumber; i++) {
                range.push(i)
            }
            for (let i = pageNumber; i <= pageNumber + this.state.paginationRange; i++) {
                range.push(i)
            }
        } else {
            for (let i = 1; i <= this.state.paginationLimit; i++) {
                range.push(i)
            }
        }
        return (
            <div className="col-12 mt-5 text-center">
                <div className="custom-pagination">

                    {pageNumber > this.state.paginationLimit - this.state.paginationRange && <a href="#">1</a>}
                    {range.map((num, index) => (
                        <React.Fragment key={index.toString()}>
                            {num === pageNumber
                                ?
                                <span className="more-page">{num}</span>
                                :
                                <a onClick={this.PaginationClickHandler.bind(this, num)}>{num}</a>
                            }
                        </React.Fragment>
                    ))}
                    <span className="more-page">...</span>
                    <a onClick={this.PaginationClickHandler}>{totalItems}</a>
                    {/*<span>1</span>*/}
                    {/*<a href="#">3</a>*/}
                </div>
            </div>
        )
    }


    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search)
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
)(Paginate);