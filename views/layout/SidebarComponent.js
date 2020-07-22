import SidebarMenu from "../Components/Menus/SidebarMenu";
import Search from "../Components/Search";
import ListingsFilter from "../Components/Widgets/ListingsFilter/ListingsFilter";
import {wpApiConfig} from "../../config/wp-api-config";
import useSwr from "swr";
import React from "react";
import {connect} from "react-redux";
import {getSidebarData} from "../../redux/actions/sidebar-actions"
import {buildWpApiUrl} from "../../library/api/wp/middleware";

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getSidebar = this.getSidebar.bind(this)
    }

    componentDidMount() {
        this.getSidebar();
    }



    getSidebar() {
        this.props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.sidebar))
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

                                    {item.nav_menu && <SidebarMenu data={item.nav_menu}/>}

                                </div>
                            ))}
                        </>
                        }
                    </div>
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
)(SidebarComponent);

export default Sidebar;