import Footer from "./Footer";
import SidebarMenu from "../Components/Menus/SidebarMenu";
import Search from "../Components/Search";
import ListingsFilter from "../Components/Widgets/ListingsFilter/ListingsFilter";
import PostList from "../Components/PostList";
import ContentBox from "../Components/ContentBox";
import {wpApiConfig} from "../../config/wp-api-config";
import useSwr from "swr";
import React from "react";
const fetcher = (url) => fetch(url).then((res) => res.json())

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.getSidebar = this.getSidebar.bind(this)
        this.getListingFilterData = this.getListingFilterData.bind(this);
    }

    getListingFilterData() {
        if (typeof this.props.listingsData !== "undefined" &&
            this.props.listingsData.show_filters) {
            return this.props.listingsData.filters;
        }
        return false;
    }

    getSidebar() {
        const endpoint = wpApiConfig.apiBaseUrl + wpApiConfig.endpoints.sidebar;
        const {data, error} = useSwr(endpoint, fetcher)

        if (error) return <div>Failed to load sidebar</div>
        if (!data) return <div>Loading...</div>
        return (
            <div>
                {data.map((item, index) => (
                    <div key={"sidebar_widget_"+index}>
                        {item.search &&
                            <div>
                            <Search data={item.search}/>
                                {this.getListingFilterData() && <ListingsFilter data={this.getListingFilterData()} />}
                            </div>
                        }

                        {item.nav_menu && <SidebarMenu data={item.nav_menu} />}

                    </div>
                ))}


                {/*<PostList/>*/}


                {/*<ContentBox/>*/}


                {/*<Footer/>*/}
            </div>
        )
    }
    render() {
        return (
            <div id="sidebar">
                <div className="inner">
                    <this.getSidebar/>
                </div>
            </div>
        )
    }
}
export default Sidebar;