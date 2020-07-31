import {siteConfig} from "./site-config";
import ListingsBlock from "../views/Components/Widgets/Listings/ListingsBlock/ListingsBlock";

export const wpApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_WP_API_URL,
    endpoints: {
        posts: "wp/v2/posts",
        page: "wp/v2/page/%s",
        pages: "wp/v2/pages",
        media: "wp/v2/media",
        menu: "wp/v2/menu/%s",
        sidebar: "wp/v2/sidebar/"+siteConfig.sidebarName,
        topBar: "wp/v2/sidebar/"+siteConfig.topBarName,
        settings: "wp/v2/settings"
    },
    widgets:  {
        listing_block: {
            component: ListingsBlock
        }
    }
}