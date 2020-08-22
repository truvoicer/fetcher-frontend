import React, {Component} from 'react';
import TabLayout from "./Tabs/TabLayout";
import {connect} from "react-redux";
import {getPageData} from "../../redux/middleware/page-middleware";
import {isSet} from "../../library/utils";

class UserAccountBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tabList;
        if (isSet(this.props.blockData.tru_fetcher_user_area &&
            isSet(this.props.blockData.tru_fetcher_user_area.tab_list))) {
            tabList = this.props.blockData.tru_fetcher_user_area.tab_list;
        }
        return (
            <div>
                {tabList &&
                <TabLayout data={tabList}/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.page)
    return {
        blockData: state.page.blocksData
    };
}

export default connect(
    mapStateToProps,
    null
)(UserAccountBlock);
