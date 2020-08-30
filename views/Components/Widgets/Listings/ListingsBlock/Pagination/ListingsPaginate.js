import React, {useState} from "react";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware,
    loadNextOffsetMiddleware,
    loadNextPageNumberMiddleware
} from "../../../../../../redux/middleware/search-middleware";
import {
    NEW_SEARCH_REQUEST,
    PAGE_CONTROL_CURRENT_PAGE,
    PAGE_CONTROL_TOTAL_ITEMS,
    PAGE_CONTROL_TOTAL_PAGES,
} from "../../../../../../redux/constants/search-constants";
import GridItem from "../../ListingsItems/GridItems";

const ListingsPaginate = (props) => {
    const [paginationLimit, setPaginationLimit] = useState(10);
    const [paginationRange, setPaginationRange] = useState(4);

    const paginationClickHandler = (pageNumber) => {
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        props.loadNextPageNumberMiddleware(pageNumber);
    }

    const getPaginationRange = (currentPage) => {
        let range = [];
        if (currentPage > paginationLimit - paginationRange) {
            for (let i = currentPage - paginationRange; i < currentPage; i++) {
                range.push(i)
            }
            for (let i = currentPage; i <= currentPage + paginationRange; i++) {
                range.push(i)
            }
        } else {
            for (let i = 1; i <= paginationLimit; i++) {
                range.push(i)
            }
        }
        return range;
    }

    const GetPagination = () => {
        const pageControls = props.search.pageControls;
        if (pageControls[PAGE_CONTROL_TOTAL_ITEMS] === 0) {
            return null;
        }

        let range = getPaginationRange(pageControls[PAGE_CONTROL_CURRENT_PAGE]);

        return (
            <div className="col-12 mt-5 text-center">
                <div className="pagination">

                    {pageControls[PAGE_CONTROL_CURRENT_PAGE] > paginationLimit - paginationRange &&
                    <a onClick={paginationClickHandler.bind(1)}>1</a>}
                    {range.map((num, index) => (
                        <React.Fragment key={index.toString()}>
                            {num === pageControls[PAGE_CONTROL_CURRENT_PAGE]
                                ?
                                <span>{num}</span>
                                :
                                <a onClick={paginationClickHandler.bind(num)}>{num}</a>
                            }
                        </React.Fragment>
                    ))}
                    <span className="more-page">...</span>
                    <a onClick={paginationClickHandler.bind(pageControls[PAGE_CONTROL_TOTAL_PAGES])}>
                        {pageControls[PAGE_CONTROL_TOTAL_PAGES]}
                    </a>
                </div>
            </div>
        )
    }
    return (
        <>
            <GridItem/>
            <GetPagination/>
        </>
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
        loadNextOffsetMiddleware,
        loadNextPageNumberMiddleware
    }
)(ListingsPaginate);