import HeaderMenu from "../Menus/HeaderMenu";
import {connect} from "react-redux";
import Search from "../Widgets/Search";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import {siteConfig} from "../../../config/site-config";
import MobileDrawerMenu from "../Menus/MobileDrawerMenu";

const TopBarData = (props) => {
    return (
        <>
            <header className="site-navbar container py-0 " role="banner">
                <div className="row align-items-center">
                    <div className="col-6 col-xl-2">
                        <h1 className="mb-0 site-logo">
                            <a href="/"className="text-white mb-0">{props.siteData.blogname}</a>
                        </h1>
                    </div>
                    {props.topBarData.length > 0 &&
                    <>
                        {props.topBarData.map((item, index) => (
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
                                {item.nav_menu && item.nav_menu.menu_slug === siteConfig.mobileMenu &&
                                    <MobileDrawerMenu data={item.nav_menu} sidebar={"mobile"} />
                                }
                                {item.nav_menu && item.nav_menu.menu_slug !== siteConfig.mobileMenu &&
                                <HeaderMenu data={item.nav_menu} sidebar={"topbar"}/>
                                }
                            </React.Fragment>

                        ))}
                    </>
                    }
                </div>
            </header>
        </>
    )
}

function mapStateToProps(state) {
    return {
        topBarData: state.page.topBar,
        siteData: state.page.siteConfig
    };
}

export default connect(
    mapStateToProps,
    null
)(TopBarData);