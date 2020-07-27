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

class LeftSidebar extends React.Component {
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
            <div id="sidebar">
                <div className="inner">
                    <div>
                        {this.props.sidebarData.length > 0 &&
                        <>
                            {this.props.sidebarData.map((item, index) => (
                                <div key={"sidebar_widget_" + index}>
                                    {item.search &&
                                    <div>
                                        <Search data={item.search}/>
                                        <ListingsFilter />
                                    </div>
                                    }

                                    {item.nav_menu && <SidebarMenu data={item.nav_menu} sidebar={"sidebar"}/>}

                                </div>
                            ))}
                        </>
                        }
                    </div>
                    {/*<Footer />*/}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sidebarData: state.page.sidebar
    };
}

const Sidebar = connect(
    mapStateToProps,
    {getSidebarData}
)(LeftSidebar);

export default Sidebar;