import React from 'react';
import TabLayout from "../Tabs/TabLayout";
import {connect} from "react-redux";
import {SESSION_AUTHENTICATED} from "../../../redux/constants/session-constants";
import Login from "../Auth/AuthLoginForm";

const UserAccountBlock = (props) => {
    const buildTabLayoutData = (menuData) => {
        return menuData.map((item) => {
            return {
                page_name: item.menu_item?.post_name,
                tab_label: item.menu_item?.blocks_data?.tru_fetcher_user_area?.tab_label,
                panel_heading: item.menu_item?.blocks_data?.tru_fetcher_user_area?.heading,
                tab_component: item.menu_item?.blocks_data?.tru_fetcher_user_area?.component,
            }
        });
    }

    const getPageIndex = () => {
        let tabIndex = 0;
        tabData.map( (item, index) => {
            if(item.tab_component === props.blockData.tru_fetcher_user_area?.component) {
                tabIndex = index
            }
        });
        return tabIndex;
    }
    const tabData = buildTabLayoutData(props.userAccountMenu);
    return (
            <div className={"user-account-area"}>
                {tabData.length > 0 &&
                <TabLayout
                    data={tabData}
                    tabIndex={getPageIndex()}
                />
                }
            </div>
    );
}

function mapStateToProps(state) {
    // console.log(state.page)
    return {
        blockData: state.page.blocksData,
        userAccountMenu: state.page.userAccountMenu
    };
}

export default connect(
    mapStateToProps,
    null
)(UserAccountBlock);