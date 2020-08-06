import HeaderMenu from "../Menus/HeaderMenu";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";
import {connect} from "react-redux";
import {getSidebarData} from "../../../redux/middleware/sidebar-middleware";
import Search from "../Widgets/Search";
import React from "react";
import {TOPBAR_REQUEST} from "../../../redux/constants/sidebar-constants";
import ReactHtmlParser from "react-html-parser";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.getSidebar = this.getSidebar.bind(this)
    }

    componentDidMount() {
        this.getSidebar();
    }

    getSidebar() {
        this.props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.topBar), TOPBAR_REQUEST)
    }

    render() {
        return (
            <>
                <header className="site-navbar container py-0 " role="banner">
                    <div className="row align-items-center">
                        <div className="col-6 col-xl-2">
                            <h1 className="mb-0 site-logo">
                                <a href="/"className="text-white mb-0">{this.props.siteData.blogname}</a>
                            </h1>
                        </div>
                        {this.props.topBarData.length > 0 &&
                        <>
                            {this.props.topBarData.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.search &&
                                    <div>
                                        <Search data={item.search}/>
                                    </div>
                                    }
                                    {item.custom_html && item.custom_html.content &&
                                    <div>
                                        {ReactHtmlParser(item.custom_html.content)}
                                    </div>
                                    }

                                    {item.nav_menu && <HeaderMenu data={item.nav_menu} sidebar={"topbar"}/>}
                                </React.Fragment>

                            ))}
                        </>
                        }
                    </div>
                </header>

            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        topBarData: state.page.topBar,
        siteData: state.page.siteConfig
    };
}

export default connect(
    mapStateToProps,
    {getSidebarData}
)(TopBar);