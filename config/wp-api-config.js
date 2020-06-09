import {siteConfig} from "./site-config";
import ListingsBlock from "../views/Components/Widgets/ListingsBlock";

export const wpApiConfig = {
    apiBaseUrl: "http://fetcher-wordpress.test/wp-json/wp/v2/",
    endpoints: {
        posts: "posts",
        page: "page/%s",
        pages: "pages",
        media: "media",
        menu: "menu/%s",
        sidebar: "sidebar/"+siteConfig.sidebarName,
        settings: "settings"
    },
    widgets:  {
        listing_block: {
            component: <ListingsBlock/>
        }
    }

}