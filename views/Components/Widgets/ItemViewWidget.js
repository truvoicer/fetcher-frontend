import React from 'react';
import {siteConfig} from "../../../config/site-config";
import {isObjectEmpty, isSet} from "../../../library/utils";
import LoaderComponent from "./Loader";
import RightSidebar from "../Sidebars/RightSidebar";
import {connect} from "react-redux";

const ItemViewWidget = (props) => {
    const getItemView = (item) =>  {
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[props.item.category])) {
            return null;
        }
        if (!isSet(gridConfig[props.item.category].single)) {
            return null;
        }
        const ItemView = gridConfig[props.item.category].single;
        return <ItemView data={item} />
    }
    return (
        <>
            {!isObjectEmpty(props.item.data)
                ?
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                {getItemView(props.item.data)}
                            </div>
                            <div className="col-lg-3 ml-auto">
                                <RightSidebar/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <LoaderComponent/>
            }
        </>
    );
}

function mapStateToProps(state) {
    console.log(state.item)
    return {
        item: state.item,
    };
}

export default connect(
    mapStateToProps,
    null
)(ItemViewWidget);