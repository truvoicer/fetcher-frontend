import React, {Component} from 'react';
import TabLayout from "./Tabs/TabLayout";
import {connect} from "react-redux";
import {getMenuMiddleware} from "../../redux/middleware/page-middleware";
import {isSet} from "../../library/utils";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";
import {SESSION_AUTHENTICATED} from "../../redux/constants/session-constants";
import Router from "next/router"
import UserNotLoggedIn from "./UserNotLoggedIn";
import Login from "../Pages/login";

class UserAccountBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabLayoutData: []
        }
        this.getMenuCallback = this.getMenuCallback.bind(this);
        this.getPageIndex = this.getPageIndex.bind(this);
    }

    componentDidMount() {
        this.props.getMenuMiddleware(buildWpApiUrl(wpApiConfig.endpoints.menu, siteConfig.myAccountMenu), this.getMenuCallback)
    }

    getMenuCallback(data) {
        this.setState({
            tabLayoutData: this.buildTabLayoutData(data)
        })
    }

    buildTabLayoutData(menuData) {
        return menuData.map((item) => {
            return {
                page_name: item.menu_item?.post_name,
                tab_label: item.menu_item?.blocks_data?.tru_fetcher_user_area?.tab_label,
                panel_heading: item.menu_item?.blocks_data?.tru_fetcher_user_area?.heading,
                tab_component: item.menu_item?.blocks_data?.tru_fetcher_user_area?.component,
            }
        });
    }

    getPageIndex() {
        let tabIndex = 0;
        this.state.tabLayoutData.map( (item, index) => {
            if(item.tab_component === this.props.blockData.tru_fetcher_user_area?.component) {
                tabIndex = index
            }
        });
        console.log(tabIndex)
        return tabIndex;
    }

    render() {
        return (
            <>
                {this.props.session[SESSION_AUTHENTICATED] &&
                <div className={"user-account-area"}>
                    {this.state.tabLayoutData.length > 0 &&
                    <TabLayout
                        data={this.state.tabLayoutData}
                        tabIndex={this.getPageIndex()}
                    />
                    }
                </div>
                }
                {!this.props.session[SESSION_AUTHENTICATED] &&
                    <Login />
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.page)
    return {
        blockData: state.page.blocksData,
        session: state.session
    };
}

export default connect(
    mapStateToProps,
    {getMenuMiddleware}
)(UserAccountBlock);