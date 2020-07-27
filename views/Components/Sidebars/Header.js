import HeaderMenu from "../Menus/HeaderMenu";
import {SiteContext} from "../../Context/SiteContext";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";
import {connect} from "react-redux";
import {getSidebarData} from "../../../redux/middleware/sidebar-middleware";
import Search from "../Widgets/Search";
import React from "react";
import {TOPBAR_REQUEST} from "../../../redux/constants/sidebar-constants";
import ReactHtmlParser from "react-html-parser";

class Header extends React.Component {
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
                <header id="header">
                    {this.props.topBarData.length > 0 &&
                    <>
                        {this.props.topBarData.map((item, index) => (
                            <div key={"sidebar_widget_" + index}>
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

                            </div>
                        ))}
                    </>
                    }

                    {/*<ul className="icons">*/}
                    {/*    <li><a href="#" className="icon brands fa-twitter"><span*/}
                    {/*        className="label">Twitter</span></a></li>*/}
                    {/*    <li>*/}
                    {/*        <a href="#" className="icon brands fa-facebook-f"><span*/}
                    {/*            className="label">Facebook</span></a>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <a href="#" className="icon brands fa-snapchat-ghost"><span*/}
                    {/*            className="label">Snapchat</span></a></li>*/}
                    {/*    <li><a href="#" className="icon brands fa-instagram"><span*/}
                    {/*        className="label">Instagram</span></a>*/}
                    {/*    </li>*/}
                    {/*    <li><a href="#" className="icon brands fa-medium-m"><span*/}
                    {/*        className="label">Medium</span></a></li>*/}
                    {/*</ul>*/}
                </header>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        topBarData: state.page.topBar
    };
}

export default connect(
    mapStateToProps,
    {getSidebarData}
)(Header);