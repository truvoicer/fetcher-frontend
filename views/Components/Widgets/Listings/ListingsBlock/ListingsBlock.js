import React from "react";
import Row from "react-bootstrap/Row";
import EventInfo from "../../../Modals/Events/EventInfo";
import {isSet} from "../../../../../library/utils";
import ProductItemCompact from "../ListingsItem/Grid/Compact/Product/ProductItemCompact";
import EventItemCompact from "../ListingsItem/Grid/Compact/Event/EventItemCompact";
import ItemInfo from "../../../Modals/Items/ItemInfo";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperation, setSearchRequestStatus} from "../../../../../redux/middleware/search-middleware";
import {
    APPEND_SEARCH_REQUEST, NEW_SEARCH_REQUEST,
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_STARTED
} from "../../../../../redux/constants/search-constants";
import InfiniteScroll from 'react-infinite-scroller';
import LoaderComponent from "../../Loader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {fetcherApiConfig} from "../../../../../config/fetcher-api-config";
import Col from "react-bootstrap/Col";
import ProductItemDetailed from "../ListingsItem/Grid/Detailed/Product/ProductItemDetailed";
import EventItemDetailed from "../ListingsItem/Grid/Detailed/Event/EventItemDetailed";
import ProductItemList from "../ListingsItem/Grid/List/Product/ProductItemList";
import EventItemList from "../ListingsItem/Grid/List/Event/EventItemList";
import RightSidebar from "../../../Sidebars/RightSidebar";

class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            modalData: {
                show: false,
                item: {},
                provider: ""
            },
            hasMore: false,
            limit: 10,
            grid: "compact",
            limitSelectOptions: [
                {value: 10, label: 10},
                {value: 50, label: 50},
                {value: 100, label: 100},
            ],
            gridSelectOptions: [
                {value: "compact", label: "Compact"},
                {value: "list", label: "List"},
                {value: "detailed", label: "Detailed"},
            ]
        }
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.limitChangeHandler = this.limitChangeHandler.bind(this)
        this.gridChangeHandler = this.gridChangeHandler.bind(this)
        this.getGridItem = this.getGridItem.bind(this)
    }

    showInfo(item, e) {
        e.preventDefault()
        this.setState({
            modalData: {
                show: true,
                item: item,
            }
        })

    }

    closeModal() {
        this.setState({
            modalData: {
                show: false,
                item: this.state.modalData.item,
                provider: this.state.modalData.provider,
            }
        })
    }

    loadNextPageNumber() {
        this.props.setSearchRequestStatus(SEARCH_REQUEST_STARTED);
        let pageNumber = parseInt(this.props.search.extraData.page_number);
        //     console.log("pageNumber")
        // console.log(pageNumber)
        this.props.setSearchRequestOperation(APPEND_SEARCH_REQUEST);
        this.props.addListingsQueryDataString("page_number", pageNumber + 1, true)
    }

    loadNextOffset() {
        this.props.setSearchRequestStatus(SEARCH_REQUEST_STARTED);
        let pageOffset = parseInt(this.props.search.extraData.page_offset);
        let pageSize = parseInt(this.props.search.extraData.page_size)
        // console.log(pageOffset, pageSize)
        this.props.setSearchRequestOperation(APPEND_SEARCH_REQUEST);
        this.props.addListingsQueryDataString("page_offset", pageOffset + pageSize, true)
    }

    loadMore() {
        if (this.props.search.searchStatus !== SEARCH_REQUEST_COMPLETED) {
            return false;
        }

        if (isSet(this.props.search.extraData.page_offset) && isSet(this.props.search.extraData.page_size)) {
            this.loadNextOffset();
        } else if (isSet(this.props.search.extraData.page_number)) {
            this.loadNextPageNumber();
        }
    }

    limitChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.addListingsQueryDataString(fetcherApiConfig.searchLimitKey, e.target.value, true)
    }

    gridChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getGridItem(item) {
        switch (this.state.grid) {
            case "compact":
                if (this.props.search.category === "retail") {
                    return <ProductItemCompact data={item} showInfoCallback={this.showInfo}/>
                } else if (this.props.search.category === "events") {
                    return <EventItemCompact data={item} showInfoCallback={this.showInfo}/>
                }
                break;
            case "detailed":
                if (this.props.search.category === "retail") {
                    return <ProductItemDetailed data={item} showInfoCallback={this.showInfo}/>
                } else if (this.props.search.category === "events") {
                    return <EventItemDetailed data={item} showInfoCallback={this.showInfo}/>
                }
                break;
            case "list":
                if (this.props.search.category === "retail") {
                    return <ProductItemList data={item} showInfoCallback={this.showInfo}/>
                } else if (this.props.search.category === "events") {
                    return <EventItemList data={item} showInfoCallback={this.showInfo}/>
                }
                break;

        }
    }

    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search)
        // console.log(this.context.listingsSearchResults)
        return (
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {this.props.search.searchList.length > 0 ?
                                <>
                                    <InfiniteScroll
                                        pageStart={0}
                                        initialLoad={false}
                                        loadMore={this.loadMore}
                                        hasMore={this.props.search.hasMoreResults}
                                        loader={<LoaderComponent key={"loader"}/>}
                                    >
                                        <Row>
                                            {this.props.search.searchList.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    {this.getGridItem(item)}
                                                </React.Fragment>
                                            ))}
                                        </Row>
                                    </InfiniteScroll>
                                    {this.props.search.category === "events" && this.state.modalData.show &&
                                    <EventInfo data={this.state.modalData} close={this.closeModal}/>
                                    }
                                    {this.props.search.category === "retail" && this.state.modalData.show &&
                                    <ItemInfo data={this.state.modalData} close={this.closeModal}/>
                                    }
                                    </>
                                :
                                <LoaderComponent key={"loader"}/>
                            }
                        </div>
                        <div className="col-lg-3 ml-auto">
                            <RightSidebar />
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
    {addListingsQueryDataString, setSearchRequestOperation, setSearchRequestStatus}
)(ListingsBlock);