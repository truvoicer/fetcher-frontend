import {connect} from "react-redux";

import React, {useState} from 'react';
import {getPageDataMiddleware} from "../../../redux/middleware/page-middleware";
import Router from "next/router";
import {setSearchRequestOperationMiddleware} from "../../../redux/middleware/search-middleware";
import {logout} from "../../../redux/actions/session-actions";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import {isSet} from "../../../library/utils";

const MaterialMenuList = (props) => {

    const [expand, setExpand] = useState({
        open: false,
        menu_name: ""
    })
    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
    }

    const pageClickHandler = (item, hasChildren = false) => {
        // console.log(item, hasChildren)
        // if (hasChildren) {
        //     let expand = true;
        //     if (this.state.expand && this.state.menu_name === item.menu_item.post_name) {
        //         expand = false;
        //     }
        //     this.setState({
        //         expand: expand,
        //         menu_name: item.menu_item.post_name
        //     })
        //     return false;
        // }
        if (isSet(item.post_url) && item.post_url !== "") {
            Router.push(item.post_url, item.post_url, {shallow: true})
        }
        return false;

        // props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        // props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page, item.post_name));
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {props.data.title}
                </ListSubheader>
            }
            className={""}
        >
            {props.data.menu_items.map((item, index) => (
                item.menu_sub_items
                    ?
                    <React.Fragment key={props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                        <ListItem button
                                  key={props.sidebar + index.toString()}
                                  className="has-children"
                                  onClick={pageClickHandler.bind(item.menu_item, true)}
                        >
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.menu_item.post_title}/>
                            {expand.open && expand.menu_name === item.menu_item.post_name
                                ? <ExpandMore/>
                                : <ExpandLess/>
                            }
                        </ListItem>
                        <Collapse
                            in={(expand.open && expand.menu_name === item.menu_item.post_name)}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List
                                component="div"
                                disablePadding
                            >
                                {item.menu_sub_items.map((subItem, subIndex) => (
                                    <ListItem
                                        button className={""}
                                        key={props.sidebar + "_sidebar_sub_menu_item_" + index + subIndex}
                                        onClick={pageClickHandler.bind(subItem)}
                                    >
                                        <ListItemIcon>
                                            <StarBorder/>
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.post_title}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                    :
                    <ListItem button
                              key={props.sidebar + index.toString()}
                              className="has-children"
                              onClick={pageClickHandler.bind(item.menu_item)}
                    >
                        <ListItemText primary={item.menu_item.post_title}/>
                        {/*<a>{item.menu_item.title}</a>*/}
                    </ListItem>

            ))}
            {props.sessionLinks && props.session.authenticated &&
            <>
                <ListItem button>
                    <ListItemText primary={"My Account"}/>
                    {/*<a>{item.menu_item.title}</a>*/}
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"Logout"}/>
                    {/*<a>{item.menu_item.title}</a>*/}
                </ListItem>
            </>
            }
            {props.sessionLinks && !props.session.authenticated &&
            <>
                <ListItem button>
                    <ListItemText primary={"Login"}/>
                    {/*<a>{item.menu_item.title}</a>*/}
                </ListItem>
                <ListItem button>
                    <ListItemText primary={"Register"}/>
                    {/*<a>{item.menu_item.title}</a>*/}
                </ListItem>
            </>
            }
        </List>
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
)(MaterialMenuList);