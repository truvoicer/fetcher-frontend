import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../Modals/Events/EventInfo";
import {isSet} from "../../../library/utils";
import ListingsBlockItem from "./ListingsBlockItem";
import ListingsBlockEvent from "./ListingsBlockEvent";
import ItemInfo from "../Modals/Items/ItemInfo";
import {connect} from "react-redux";
import {addArrayItem, removeArrayItem, addListingsQueryDataString} from "../../../redux/middleware/listings-middleware";
import {setSearchRequestOperation, setSearchRequestStatus} from "../../../redux/actions/search-actions";
import {
    APPEND_SEARCH_REQUEST,
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_STARTED
} from "../../../redux/constants/search-constants";
import InfiniteScroll from 'react-infinite-scroller';

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
            hasMore: false
        }
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.getListItems = this.getListItems.bind(this)
        // this.onScroll = this.onScroll.bind(this)
        // this.threshold = 10
        // this.lastScrollTop = 0
        // window.addEventListener('scroll', this.onScroll);
    }

    // onScroll(e) {
    //     let st = window.pageYOffset;
    //     if (st > this.lastScrollTop) {
    //         let loader = document.getElementsByClassName("loader")[0];
    //         if (!isSet(loader)) {
    //             return false;
    //         }
    //         if (((window.scrollY + window.innerHeight) >= (loader.offsetTop - this.threshold) ||
    //             (window.scrollY + window.innerHeight) <= (loader.offsetTop - this.threshold)) &&
    //             this.props.search.requestStatus) {
    //             // console.log((window.scrollY + window.innerHeight), loader.offsetTop)
    //             this.context.setListingsRequestStatus(false)
    //             this.loadMore()
    //         }
    //     }
    //     this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }

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

    loadMore() {
        // console.log(this.props.search.requestStatus)
        if (this.props.search.searchStatus !== SEARCH_REQUEST_COMPLETED) {
            return false;
        }
        if (isSet(this.props.search.extraData.page_number)) {
            this.props.setSearchRequestStatus(SEARCH_REQUEST_STARTED);
            let pageNumber = parseInt(this.props.search.extraData.page_number);
            //     console.log("pageNumber")
                console.log(pageNumber)
            this.props.setSearchRequestOperation(APPEND_SEARCH_REQUEST);
            this.props.addListingsQueryDataString("page_number", pageNumber + 1)
        }
        // console.log(listingsQueryData);
    }

    getListItems() {

    }

    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search)
        // console.log(this.context.listingsSearchResults)
        const extraData = this.props.search.extraData;
        return (
            <div id={"listing_block"} className={"listings-block"}>
                <div className={"sort-bar"}>
                    Listings block
                </div>
                {this.props.search.searchList.length > 0 ?
                    <>
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.loadMore}
                        hasMore={extraData.page_number < extraData.page_count}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        <Row>
                            {this.props.search.searchList.map((item, index) => (
                                <React.Fragment key={index}>
                                    {this.props.search.category === "retail" &&
                                    <ListingsBlockItem data={item} showInfoCallback={this.showInfo}/>
                                    }
                                    {this.props.search.category === "events" &&
                                    <ListingsBlockEvent data={item} showInfoCallback={this.showInfo}/>
                                    }
                                </React.Fragment>
                            ))}
                            {/*{this.props.search.requestStatus === SEARCH_REQUEST_COMPLETED &&*/}
                            {/*<div className="loader" key={0}>Loading ...</div>*/}
                            {/*}*/}
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
                    <p>loading</p>
                }

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