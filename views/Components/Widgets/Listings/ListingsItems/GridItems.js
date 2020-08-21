import React from "react";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware
} from "../../../../../redux/middleware/search-middleware";
import {siteConfig} from "../../../../../config/site-config";
import {convertImageObjectsToArray, isSet} from "../../../../../library/utils";
const sprintf = require("sprintf").sprintf
import Router from "next/router";
import {Routes} from "../../../../../config/routes";

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
        this.getModal = this.getModal.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    showInfo(item, e) {
        e.preventDefault()

        const data = {
            category: this.props.search.category,
            provider: item.provider,
            item_id: item.item_id
        }
        const url = sprintf(Routes.itemView, data)

        Router.push(url, url, { shallow: true })
        // this.setState({
        //     modalData: {
        //         show: true,
        //         item: item,
        //     }
        // })

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
        let gridItem = {...item};
        if (isSet(gridItem.image_list)) {
            gridItem.image_list = convertImageObjectsToArray(gridItem.image_list);
        }
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[this.props.search.category])) {
            return null;
        }
        if (!isSet(gridConfig[this.props.search.category][this.props.listings.listingsGrid])) {
            return null;
        }
        const GridItems = gridConfig[this.props.search.category][this.props.listings.listingsGrid];
        return <GridItems data={gridItem} showInfoCallback={this.showInfo} />
    }

    getModal(item) {
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[this.props.search.category])) {
            return null
        }
        if (!isSet(gridConfig[this.props.search.category].modal)) {
            return null;
        }
        const ItemModal = gridConfig[this.props.search.category].modal;
        return <ItemModal  data={this.state.modalData} close={this.closeModal} />

    }
    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search.searchList)
        return (
            <>
                <Row>
                    {this.props.search.searchList.map((item, index) => (
                        <React.Fragment key={index}>
                            {this.getGridItem(item)}
                        </React.Fragment>
                    ))}
                </Row>

                {this.state.modalData.show &&
                    <this.getModal />
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