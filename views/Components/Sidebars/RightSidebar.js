import SidebarMenu from "../Menus/SidebarMenu";
import Search from "../Widgets/Search";
import ListingsFilter from "../Widgets/Listings/ListingsFilter/ListingsFilter";
import {wpApiConfig} from "../../../config/wp-api-config";
import useSwr from "swr";
import React from "react";
import {connect} from "react-redux";
import {getSidebarData} from "../../../redux/middleware/sidebar-middleware"
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {SIDEBAR_REQUEST} from "../../../redux/constants/sidebar-constants";
import Footer from "../../layout/Footer";

class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.getSidebar = this.getSidebar.bind(this)
    }

    componentDidMount() {
        this.getSidebar();
    }


    getSidebar() {
        this.props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.sidebar), SIDEBAR_REQUEST)
    }

    render() {
        return (
            <div className="mb-5 sidebar">
                {this.props.sidebarData.length > 0 &&
                <>
                    {this.props.sidebarData.map((item, index) => (
                        <React.Fragment key={index.toString()}>
                            {item.search &&
                                <>
                                <Search data={item.search}/>
                                    {this.props.listings.listingsData && <ListingsFilter />}
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
}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        sidebarData: state.page.sidebar
    };
}


export default connect(
    mapStateToProps,
    {getSidebarData}
)(RightSidebar);