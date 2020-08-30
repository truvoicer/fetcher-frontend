import {connect} from "react-redux";
import React from 'react';
import {getPageDataMiddleware} from "../../../redux/middleware/page-middleware";
import Router from "next/router";
import {setSearchRequestOperationMiddleware} from "../../../redux/middleware/search-middleware";
import {siteConfig} from "../../../config/site-config";
import {logout} from "../../../redux/actions/session-actions";

const MenuList = (props) => {

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
    }

    const pageClickHandler = (item, e) => {
        e.preventDefault()
        let url = e.target.getAttribute("href");
        Router.push(url, url, {shallow: true})

        // props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        // props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page, item.post_name));
    }

    return (
        <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
            {props.data.menu_items.map((item, index) => (
                item.menu_sub_items
                    ?
                    <li className="has-children"
                        key={props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                        <a>{item.menu_item.title}</a>
                        <ul className="dropdown">
                            {item.menu_sub_items.map((subItem, subIndex) => (
                                <li key={props.sidebar + "_sidebar_sub_menu_item_" + index + subIndex}>
                                    <a href={"/" + subItem.post_name}
                                       onClick={pageClickHandler.bind(subItem)}>{subItem.post_title}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    :
                    <li key={props.sidebar + index.toString()}>
                        <a href={"/" + item.menu_item.post_name}
                           onClick={pageClickHandler.bind(item.menu_item)}>{item.menu_item.post_title}</a>
                    </li>

            ))}
            {props.sessionLinks && props.session.authenticated &&
                <>
                    <li className="ml-xl-3">
                        <a href={siteConfig.defaultUserAccountHref}>
                            <span className="border-left pl-xl-4"/>
                            My Account
                        </a>
                    </li>
                    <li className="ml-xl-3">
                        <a onClick={logoutHandler}>
                            <span className="border-left pl-xl-4"/>
                            Logout
                        </a>
                    </li>
                </>
            }
            {props.sessionLinks && !props.session.authenticated &&
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