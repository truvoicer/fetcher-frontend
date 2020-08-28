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
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";

class MaterialMenuList extends React.Component {
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

    pageClickHandler(item, hasChildren = false, e) {
        e.preventDefault()
        if (hasChildren) {
            let expand = true;
            if (this.state.expand && this.state.menu_name === item.menu_item.post_name) {
                expand = false;
            }
            this.setState({
                expand: expand,
                menu_name: item.menu_item.post_name
            })
            return false;
        }
        let url = e.target.getAttribute("href");
        Router.push(url, url, {shallow: true})

        // this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        // this.props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page, item.post_name));
    }

    render() {
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
                className={""}
            >
                {this.props.data.menu_items.map((item, index) => (
                    item.menu_sub_items
                        ?
                        <React.Fragment key={this.props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                            <ListItem button
                                      key={this.props.sidebar + index.toString()}
                                      className="has-children"
                                      onClick={this.pageClickHandler.bind(this, item.menu_item, true)}
                            >
                                <ListItemText primary={item.menu_item.post_title} />
                                {/*<a>{item.menu_item.title}</a>*/}
                                {this.state.expand && this.state.menu_name === item.menu_item.post_name
                                    ? <ExpandMore />
                                    : <ExpandLess />
                                }
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.menu_sub_items.map((subItem, subIndex) => (
                                        <ListItem button className={classes.nested}
                                                  key={this.props.sidebar + "_sidebar_sub_menu_item_" + index + subIndex}
                                                  onClick={this.pageClickHandler.bind(this, subItem)}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={subItem.post_title} />
                                        </ListItem>
                                        ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                        :
                        <ListItem button
                                  key={this.props.sidebar + index.toString()}
                                  className="has-children"
                                  onClick={this.pageClickHandler.bind(this, item.menu_item)}
                        >
                            <ListItemText primary={item.menu_item.post_title} />
                            {/*<a>{item.menu_item.title}</a>*/}
                        </ListItem>

                ))}
                {this.props.sessionLinks && this.props.session.authenticated &&
                    <>
                        <ListItem button>
                            <ListItemText primary={"My Account"} />
                            {/*<a>{item.menu_item.title}</a>*/}
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={"Logout"} />
                            {/*<a>{item.menu_item.title}</a>*/}
                        </ListItem>
                    </>
                }
                {this.props.sessionLinks && !this.props.session.authenticated &&
                <>
                    <ListItem button>
                        <ListItemText primary={"Login"} />
                        {/*<a>{item.menu_item.title}</a>*/}
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Register"} />
                        {/*<a>{item.menu_item.title}</a>*/}
                    </ListItem>
                </>
                }
            </List>
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
)(MaterialMenuList);