import {siteConfig} from "./site-config";
import ListingsBlock from "../views/Components/Widgets/Listings/ListingsBlock/ListingsBlock";
import ItemViewWidget from "../views/Components/Widgets/ItemViewWidget";
import Login from "../views/Pages/login";
import Register from "../views/Pages/register";

export const wpApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_WP_API_URL,
    endpoints: {
        posts: "wp/v2/public/posts",
        page: "wp/v2/public/page/%s",
        pages: "wp/v2/public/pages",
        template: "wp/v2/public/template/item-view/%s",
        media: "wp/v2/public/media",
        menu: "wp/v2/public/menu/%s",
        sidebar: "wp/v2/public/sidebar/"+siteConfig.sidebarName,
        topBar: "wp/v2/public/sidebar/"+siteConfig.topBarName,
        footer: "wp/v2/public/sidebar/"+siteConfig.footerName,
        settings: "wp/v2/public/settings",
        token: "jwt-auth/v1/token",
        validateToken: "jwt-auth/v1/token/validate"
    },
    widgets:  {
        listing_block: {
            component: ListingsBlock
        },
        item_view_block: {
            component: ItemViewWidget
        },
        login_block: {
            component: Login
        },
        register_block: {
            component: Register
        },
    }
}