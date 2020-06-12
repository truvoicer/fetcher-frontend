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

    getListingFilterData(item) {
        if (typeof this.props.listingsData !== "undefined" &&
            this.props.listingsData.filters_override) {
            return this.props.listingsData.listing_filter_settings_override;
        }
        return item.listings_filter_widget
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
                        {item.search && <Search data={item.search}/>}

                        {item.nav_menu && <SidebarMenu data={item.nav_menu} />}

                        {item.listings_filter_widget && <ListingsFilter data={this.getListingFilterData(item)} />}
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