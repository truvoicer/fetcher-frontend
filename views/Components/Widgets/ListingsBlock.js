import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import InfiniteScroll from 'react-infinite-scroller';
import {getDefaultImage, runSearch} from "../../../library/api/fetcher/search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../Modals/Events/EventInfo";
import {isSet} from "../../../library/utils";


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

    loadMore(page) {
        console.log("page")
        console.log(page)
        let listingsQueryData = this.context.listingsQueryData;
        if(isSet(this.context.listingsSearchResults.listData.page_number)) {
            let pageNumber = parseInt(this.context.listingsSearchResults.listData.page_number);
            listingsQueryData.page_number = pageNumber + 1;
            // if(page < 3) {
                console.log("pageNumber")
                console.log(listingsQueryData.page_number)
                this.context.setListingsQueryData(listingsQueryData, false);
            // }
        }
        console.log(listingsQueryData);
    }

    getListItems() {
        return (
            <Row>
                {this.context.listingsSearchResults.listItems.map((item, index) => (
                    <Col sm={12} md={4} lg={4} key={index}>
                        <div className={"listings-block--item"} key={index}>
                            <div className={"listings-block--item--image"}>
                                <a href="#" className="image">
                                    <img className={"default-image"} src={getDefaultImage(item)}/>
                                </a>
                            </div>
                            <h3 className={"listings-block--item--title"}>{item.event_name}</h3>
                            <div className={"listings-block--item--actions"}>
                                <a className="button" onClick={this.showInfo.bind(this, item)}>More</a>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        )
    }

    render() {
        return (
            <div className={"listings-block"} ref={(ref) => this.scrollParentRef = ref}>
                <div className={"sort-bar"}>

                </div>
                {this.context.listingsSearchResults.listItems ?
                    <>
                        {this.context.listingsSearchResults.completed
                            ?
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadMore}
                                hasMore={this.state.hasMore}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                            >
                                <this.getListItems/>
                            </InfiniteScroll>
                            :
                            <this.getListItems/>
                        }
                        {this.context.listingsSearchResults.requestService === "event_search" && this.state.modalData.show &&
                        <EventInfo data={this.state.modalData} close={this.closeModal}/>
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