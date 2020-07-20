import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {getDefaultImage, runSearch} from "../../../library/api/fetcher/search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../Modals/Events/EventInfo";
import {isSet} from "../../../library/utils";
import ListingsBlockItem from "./ListingsBlockItem";
import ListingsBlockEvent from "./ListingsBlockEvent";
import ItemInfo from "../Modals/Items/ItemInfo";


class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalData: {
                show: false,
                item: {},
                provider: ""
            },
            hasMore: true
        }
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.getListItems = this.getListItems.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.threshold = 10
        this.lastScrollTop = 0
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
        let st = window.pageYOffset;
        if (st > this.lastScrollTop) {
            let loader = document.getElementsByClassName("loader")[0];
            if (!isSet(loader)) {
                return false;
            }
            if (((window.scrollY + window.innerHeight) >= (loader.offsetTop - this.threshold) ||
                (window.scrollY + window.innerHeight) <= (loader.offsetTop - this.threshold)) &&
                this.context.listingsRequestStatus) {
                // console.log((window.scrollY + window.innerHeight), loader.offsetTop)
                this.context.setListingsRequestStatus(false)
                this.loadMore()
            }
        }
        this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
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

    loadMore() {
        // console.log(this.context.listingsRequestStatus)
        let listingsQueryData = this.context.listingsQueryData;
        if (isSet(this.context.listingsSearchResults.listData.page_number)) {
            let pageNumber = parseInt(this.context.listingsSearchResults.listData.page_number);
            // listingsQueryData.page_number = pageNumber + 1;
            //     console.log("pageNumber")
            //     console.log(listingsQueryData.page_number)
            this.context.setListingsQueryData(listingsQueryData, false);
        }
        // console.log(listingsQueryData);
    }

    getListItems() {

    }

    render() {
        console.log(this.context.listingsSearchResults)
        return (
            <div id={"listing_block"} className={"listings-block"}>
                <div className={"sort-bar"}>

                </div>
                {this.context.listingsSearchResults.listItems ?
                    <>
                        <Row>
                            {this.context.listingsSearchResults.listItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {this.context.listingsSearchResults.category === "retail" &&
                                    <ListingsBlockItem data={item} showInfoCallback={this.showInfo}/>
                                    }
                                    {this.context.listingsSearchResults.category === "events" &&
                                    <ListingsBlockEvent data={item} showInfoCallback={this.showInfo}/>
                                    }
                                </React.Fragment>
                            ))}
                            {this.context.listingsRequestStatus &&
                            <div className="loader" key={0}>Loading ...</div>
                            }
                        </Row>
                        {this.context.listingsSearchResults.category === "events" && this.state.modalData.show &&
                        <EventInfo data={this.state.modalData} close={this.closeModal}/>
                        }
                        {this.context.listingsSearchResults.category === "retail" && this.state.modalData.show &&
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

ListingsBlock.contextType = ListingsContext;
export default ListingsBlock;