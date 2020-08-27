import {connect} from "react-redux";

const sprintf = require("sprintf").sprintf;
import React from 'react';
import {getPageDataMiddleware} from "../../../redux/middleware/page-middleware";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";
import Router from "next/router";
import {APPEND_SEARCH_REQUEST, NEW_SEARCH_REQUEST} from "../../../redux/constants/search-constants";
import {setSearchRequestOperationMiddleware} from "../../../redux/middleware/search-middleware";
import {siteConfig} from "../../../config/site-config";
import {logout} from "../../../redux/actions/session-actions";

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.showSubMenu = this.showSubMenu.bind(this)
        this.pageClickHandler = this.pageClickHandler.bind(this)
        this.logoutHandler = this.logoutHandler.bind(this)
    }

    showSubMenu(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }

    logoutHandler(e) {
        e.preventDefault();
        logout();
    }

    pageClickHandler(item, e) {
        e.preventDefault()
        let url = e.target.getAttribute("href");
        Router.push(url, url, {shallow: true})

        // this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        // this.props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page, item.post_name));
    }

    render() {
        return (
            <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                {this.props.data.menu_items.map((item, index) => (
                    item.menu_sub_items
                        ?
                        <li className="has-children"
                            key={this.props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                            <a>{item.menu_item.title}</a>
                            <ul className="dropdown">
                                {item.menu_sub_items.map((subItem, subIndex) => (
                                    <li key={this.props.sidebar + "_sidebar_sub_menu_item_" + index + subIndex}>
                                        <a href={"/" + subItem.post_name}
                                           onClick={this.pageClickHandler.bind(this, subItem)}>{subItem.post_title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        :
                        <li key={this.props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                            <a href={"/" + item.menu_item.post_name}
                               onClick={this.pageClickHandler.bind(this, item.menu_item)}>{item.menu_item.post_title}</a>
                        </li>

                ))}
                {this.props.sessionLinks && this.props.session.authenticated &&
                    <>
                        <li className="ml-xl-3">
                            <a href={siteConfig.defaultUserAccountHref}>
                                <span className="border-left pl-xl-4"/>
                                My Account
                            </a>
                        </li>
                        <li className="ml-xl-3">
                            <a onClick={this.logoutHandler}>
                                <span className="border-left pl-xl-4"/>
                                Logout
                            </a>
                        </li>
                    </>
                }
                {this.props.sessionLinks && !this.props.session.authenticated &&
                <>
                    <li className="ml-xl-3 login">
                        <a href={siteConfig.defaultLoginHref}>
                            <span className="border-left pl-xl-4"/>
                            Log In
                        </a>
                    </li>
                    <li>
                        <a href={siteConfig.defaultRegisterHref} className="cta">
                            <span className="bg-primary text-white rounded">Register</span>
                        </a>
                    </li>
                </>
                }
            </ul>
        )
    }
}
function mapStateToProps(state) {
    // console.log(state.session)
    return {
        session: state.session
    };
}

export default connect(
    mapStateToProps,
    {getPageDataMiddleware, setSearchRequestOperationMiddleware}
)(MenuList);