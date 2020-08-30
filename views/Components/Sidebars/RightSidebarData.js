import SidebarMenu from "../Menus/SidebarMenu";
import Search from "../Widgets/Search";
import ListingsFilter from "../Widgets/Listings/ListingsFilter/ListingsFilter";
import React from "react";
import {connect} from "react-redux";

const RightSidebarData = (props) => {
    return (
        <div className="mb-5 sidebar">
            {props.sidebarData.length > 0 &&
            <>
                {props.sidebarData.map((item, index) => (
                    <React.Fragment key={index.toString()}>
                        {item.search &&
                            <>
                            <Search data={item.search}/>
                                {props.listings.listingsData && <ListingsFilter />}
                            </>
                        }

                        {item.nav_menu && <SidebarMenu data={item.nav_menu} sidebar={"sidebar"}/>}

                    </React.Fragment>
                ))}
            </>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        sidebarData: state.page.sidebar
    };
}


export default connect(
    mapStateToProps,
    null
)(RightSidebarData);