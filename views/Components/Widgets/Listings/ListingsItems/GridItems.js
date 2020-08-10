import React from "react";
import Row from "react-bootstrap/Row";
import ProductItemCompact from ".//Grid/Compact/Product/ProductItemCompact";
import EventItemCompact from ".//Grid/Compact/Event/EventItemCompact";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware
} from "../../../../../redux/middleware/search-middleware";
import ProductItemDetailed from ".//Grid/Detailed/Product/ProductItemDetailed";
import EventItemDetailed from ".//Grid/Detailed/Event/EventItemDetailed";
import ProductItemList from ".//Grid/List/Product/ProductItemList";
import EventItemList from ".//Grid/List/Event/EventItemList";
import {
    LISTINGS_GRID_COMPACT,
    LISTINGS_GRID_DETAILED,
    LISTINGS_GRID_LIST
} from "../../../../../redux/constants/listings-constants";
import EventInfo from "../../../Modals/Events/EventInfo";
import ItemInfo from "../../../Modals/Items/ItemInfo";

class GridItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalData: {
                show: false,
                item: {},
                provider: ""
            },
        }
        this.getGridItem = this.getGridItem.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
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

    getGridItem(item) {
        switch (this.props.listings.listingsGrid) {
            case LISTINGS_GRID_COMPACT:
                if (this.props.search.category === "retail") {
                    return <ProductItemCompact data={item} showInfoCallback={this.showInfo}/>
                } else if (this.props.search.category === "events") {
                    return <EventItemCompact data={item} showInfoCallback={this.showInfo}/>
                }
                break;
            case LISTINGS_GRID_DETAILED:
                if (this.props.search.category === "retail") {
                    return <ProductItemDetailed data={item} showInfoCallback={this.showInfo}/>
                } else if (this.props.search.category === "events") {
                    return <EventItemDetailed data={item} showInfoCallback={this.showInfo}/>
                }
                break;
            case LISTINGS_GRID_LIST:
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
        return (
            <>
                <Row>
                    {this.props.search.searchList.map((item, index) => (
                        <React.Fragment key={index}>
                            {this.getGridItem(item)}
                        </React.Fragment>
                    ))}
                </Row>

                {this.props.search.category === "events" && this.state.modalData.show &&
                <EventInfo data={this.state.modalData} close={this.closeModal}/>
                }
                {this.props.search.category === "retail" && this.state.modalData.show &&
                <ItemInfo data={this.state.modalData} close={this.closeModal}/>
                }
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
        setSearchRequestStatusMiddleware
    }
)(GridItems);