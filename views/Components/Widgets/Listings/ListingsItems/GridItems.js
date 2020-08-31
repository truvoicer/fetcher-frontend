import React, {useState} from "react";
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
import {SESSION_USER, SESSION_USER_ID} from "../../../../../redux/constants/session-constants";
import {isSavedItemAction, saveItemCallback, showInfo} from "../../../../../redux/actions/search-actions";
import Col from "react-bootstrap/Col";

const GridItems = (props) => {

    const [modalData, setModalData] = useState({
        show: false,
        item: {},
        provider: ""
    });

    const closeModal = () => {
        setModalData({
            show: false,
            item: modalData.item,
            provider: modalData.provider,
        })
    }

    const getGridItem = (item) => {
        let gridItem = {...item};
        if (isSet(gridItem.image_list)) {
            gridItem.image_list = convertImageObjectsToArray(gridItem.image_list);
        }
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[props.search.category])) {
            return null;
        }
        if (!isSet(gridConfig[props.search.category][props.listings.listingsGrid])) {
            return null;
        }
        gridItem.saved_item = isSavedItemAction(item.item_id, item.provider,
            props.search.category, props.user[SESSION_USER_ID]);
        const GridItems = gridConfig[props.search.category][props.listings.listingsGrid];
        return <GridItems data={gridItem}
                          searchCategory={props.search.category}
                          showInfoCallback={showInfo}
                          saveItemCallback={saveItemCallback}/>
    }

    const GetModal = (item) => {
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[props.search.category])) {
            return null
        }
        if (!isSet(gridConfig[props.search.category].modal)) {
            return null;
        }
        const ItemModal = gridConfig[props.search.category].modal;
        return <ItemModal data={modalData} close={closeModal}/>

    }

    // console.log(props.user)
    // console.log(props.search.searchList)
    return (
        <>
            <Row>
                {props.search.searchList.map((item, index) => (
                    <React.Fragment key={index}>
                        <Col sm={12} md={6} lg={4}>
                            {getGridItem(item)}
                        </Col>
                    </React.Fragment>
                ))}
            </Row>

            {modalData.show &&
            <GetModal/>
            }
        </>
    )
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