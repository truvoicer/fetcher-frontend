import React from "react";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../redux/middleware/listings-middleware";
import {
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware,
    saveItemMiddleware,
    updateSavedItemMiddleware
} from "../../../../../redux/middleware/search-middleware";
import {siteConfig} from "../../../../../config/site-config";
import {convertImageObjectsToArray, isSet} from "../../../../../library/utils";

const sprintf = require("sprintf").sprintf
import Router from "next/router";
import {Routes} from "../../../../../config/routes";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../redux/constants/session-constants";
import {isSavedItemAction, saveItemCallback, showInfo} from "../../../../../redux/actions/search-actions";
import Col from "react-bootstrap/Col";

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
        this.closeModal = this.closeModal.bind(this)
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
        gridItem.saved_item = isSavedItemAction(item.item_id, item.provider,
            this.props.search.category, this.props.user[SESSION_USER_ID]);
        const GridItems = gridConfig[this.props.search.category][this.props.listings.listingsGrid];
        return <GridItems data={gridItem}
                          searchCategory={this.props.search.category}
                          showInfoCallback={showInfo}
                          saveItemCallback={saveItemCallback}/>
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
        return <ItemModal data={this.state.modalData} close={this.closeModal}/>

    }

    render() {
        // console.log(this.props.listings)
        // console.log(this.props.search.searchList)
        return (
            <>
                <Row>
                    {this.props.search.searchList.map((item, index) => (
                        <React.Fragment key={index}>
                            <Col sm={12} md={6} lg={4}>
                                {this.getGridItem(item)}
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>

                {this.state.modalData.show &&
                <this.getModal/>
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
        saveItemMiddleware,
        updateSavedItemMiddleware
    }
)(GridItems);