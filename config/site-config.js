import ProductItemCompact from "../views/Components/Widgets/Listings/ListingsItems/Grid/Retail/ProductItemCompact";
import ProductItemList from "../views/Components/Widgets/Listings/ListingsItems/Grid/Retail/ProductItemList";
import ProductItemDetailed from "../views/Components/Widgets/Listings/ListingsItems/Grid/Retail/ProductItemDetailed";
import EventItemCompact from "../views/Components/Widgets/Listings/ListingsItems/Grid/Events/EventItemCompact";
import EventItemList from "../views/Components/Widgets/Listings/ListingsItems/Grid/Events/EventItemList";
import EventItemDetailed from "../views/Components/Widgets/Listings/ListingsItems/Grid/Events/EventItemDetailed";
import RealEstateItemCompact
    from "../views/Components/Widgets/Listings/ListingsItems/Grid/RealEstate/RealEstateItemCompact";
import RealEstateItemList from "../views/Components/Widgets/Listings/ListingsItems/Grid/RealEstate/RealEstateItemList";
import RealEstateItemDetailed
    from "../views/Components/Widgets/Listings/ListingsItems/Grid/RealEstate/RealEstateItemDetailed";
import {LISTINGS_GRID_COMPACT, LISTINGS_GRID_DETAILED, LISTINGS_GRID_LIST} from "../redux/constants/listings-constants";
import EventInfoModal from "../views/Components/Widgets/Listings/ListingsItems/Grid/Events/EventInfoModal";
import RetailInfoModal from "../views/Components/Widgets/Listings/ListingsItems/Grid/Retail/RetailInfoModal";
import RealEstateInfoModal
    from "../views/Components/Widgets/Listings/ListingsItems/Grid/RealEstate/RealEstateInfoModal";

export const siteConfig =  {
    sidebarMenu: "main-menu",
    headerMenu: "main-menu",
    sidebarName: "right-sidebar",
    topBarName: "top-bar",
    footerName: "footer",
    gridItems: {
        retail: {
            [LISTINGS_GRID_COMPACT]: ProductItemCompact,
            [LISTINGS_GRID_LIST]: ProductItemList,
            [LISTINGS_GRID_DETAILED]: ProductItemDetailed,
            modal: RetailInfoModal
        },
        events: {
            [LISTINGS_GRID_COMPACT]: EventItemCompact,
            [LISTINGS_GRID_LIST]: EventItemList,
            [LISTINGS_GRID_DETAILED]: EventItemDetailed,
            modal: EventInfoModal
        },
        real_estate: {
            [LISTINGS_GRID_COMPACT]: RealEstateItemCompact,
            [LISTINGS_GRID_LIST]: RealEstateItemList,
            [LISTINGS_GRID_DETAILED]: RealEstateItemDetailed,
            modal: RealEstateInfoModal
        },
    }
}