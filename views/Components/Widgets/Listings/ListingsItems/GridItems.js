import React from "react";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {saveItemMiddleware} from "../../../../../redux/middleware/session-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware
} from "../../../../../redux/middleware/search-middleware";
import {siteConfig} from "../../../../../config/site-config";
import {convertImageObjectsToArray, isSet} from "../../../../../library/utils";
const sprintf = require("sprintf").sprintf
import Router from "next/router";
import {Routes} from "../../../../../config/routes";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../redux/constants/session-constants";

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
        this.saveItemCallback = this.saveItemCallback.bind(this)
        this.saveItemRequestCallback = this.saveItemRequestCallback.bind(this)
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

    saveItemCallback(provider, category, itemId, e) {
        const data = {
            provider_name: provider,
            category: category,
            item_id: itemId,
            user_id: this.props.user[SESSION_USER_ID]
        }
        console.log(data)
        this.props.saveItemMiddleware(data, this.saveItemRequestCallback)
    }

    saveItemRequestCallback(error, data) {
        console.log(error, data)
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

    isSavedItem(item) {
        const isSaved = this.props.search.savedItemsList.filter(savedItem => savedItem.item_id === item.item_id);
        if (isSaved.length > 0) {
            return true;
        }
        return false;
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
        gridItem.saved_item = this.isSavedItem(gridItem);
        const GridItems = gridConfig[this.props.search.category][this.props.listings.listingsGrid];
        return <GridItems data={gridItem}
                          searchCategory={this.props.search.category}
                          showInfoCallback={this.showInfo}
                          saveItemCallback={this.saveItemCallback} />
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
        user: state.session[SESSION_USER],
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
        saveItemMiddleware
    }
)(GridItems);