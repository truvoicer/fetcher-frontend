import {siteConfig} from "./site-config";
import ListingsBlock from "../views/Components/Widgets/ListingsBlock";

export const wpApiConfig = {
    apiBaseUrl: "http://fetcher-wordpress.test/wp-json/",
    endpoints: {
        posts: "wp/v2/posts",
        page: "wp/v2/page/%s",
        pages: "wp/v2/pages",
        media: "wp/v2/media",
        menu: "wp/v2/menu/%s",
        sidebar: "wp/v2/sidebar/"+siteConfig.sidebarName,
        settings: "wp/v2/settings"
    },
    widgets:  {
        listing_block: {
            component: ListingsBlock
        }
    }

}