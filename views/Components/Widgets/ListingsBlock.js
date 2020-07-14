import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildFetcherApiUrl, fetchData, fetchSearchData} from "../../../library/api/fetcher/middleware";
import {getToken, isAuthenticated, setSession} from "../../../library/api/fetcher/session/authenticate";
import {isSet} from "../../../library/utils";
import {getDefaultImage, runSearch} from "../../../library/api/fetcher/search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../Modals/Events/EventInfo";


class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalData: {
                show: false,
                item: {},
                provider: ""
            }
        }
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    showInfo(item, e) {
        e.preventDefault()
        this.setState({
            modalData: {
                show: true,
                item: item,
                provider: this.context.listingsSearchResults.provider
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
    render() {
        return (
            <div className={"listings-block"}>
                <div className={"sort-bar"}>

                </div>
                {this.context.listingsSearchResults.listItems ?
                    <>
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
                    {this.context.listingsSearchResults.requestService === "event_search" && this.state.modalData.show &&
                    <EventInfo data={this.state.modalData} close={this.closeModal} />
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