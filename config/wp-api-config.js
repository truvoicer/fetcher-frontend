import {siteConfig} from "./site-config";
import ListingsBlock from "../views/Components/Widgets/Listings/ListingsBlock/ListingsBlock";
import HeroBlock from "../views/Components/HeroBlock";
import ProductItemCompact
    from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemCompact";
import ProductItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemList";
import ProductItemDetailed
    from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemDetailed";
import EventItemCompact from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemCompact";
import EventItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemList";
import EventItemDetailed from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemDetailed";
import RealEstateItemCompact
    from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemCompact";
import RealEstateItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemList";
import RealEstateItemDetailed
    from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemDetailed";
import ItemViewWidget from "../views/Components/Widgets/ItemViewWidget";

export const wpApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_WP_API_URL,
    endpoints: {
        posts: "wp/v2/posts",
        page: "wp/v2/page/%s",
        pages: "wp/v2/pages",
        template: "wp/v2/template/item-view/%s",
        media: "wp/v2/media",
        menu: "wp/v2/menu/%s",
        sidebar: "wp/v2/sidebar/"+siteConfig.sidebarName,
        topBar: "wp/v2/sidebar/"+siteConfig.topBarName,
        footer: "wp/v2/sidebar/"+siteConfig.footerName,
        settings: "wp/v2/settings"
    },
    widgets:  {
        listing_block: {
            component: ListingsBlock
        },
        item_view_block: {
            component: ItemViewWidget
        },
    }
}