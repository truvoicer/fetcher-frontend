import ProductItemCompact from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemCompact";
import ProductItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemList";
import ProductItemDetailed from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/ProductItemDetailed";
import EventItemCompact from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemCompact";
import EventItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemList";
import EventItemDetailed from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemDetailed";
import RealEstateItemCompact
    from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemCompact";
import RealEstateItemList from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemList";
import RealEstateItemDetailed
    from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemDetailed";
import {LISTINGS_GRID_COMPACT, LISTINGS_GRID_DETAILED, LISTINGS_GRID_LIST} from "../redux/constants/listings-constants";
import EventInfoModal from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventInfoModal";
import RetailInfoModal from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/RetailInfoModal";
import RealEstateInfoModal
    from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateInfoModal";
import RetailItemView from "../views/Components/Widgets/Listings/ListingsItems/Items/Retail/RetailItemView";
import EventItemView from "../views/Components/Widgets/Listings/ListingsItems/Items/Events/EventItemView";
import RealEstateItemView from "../views/Components/Widgets/Listings/ListingsItems/Items/RealEstate/RealEstateItemView";

export const siteConfig =  {
    sidebarMenu: "main-menu",
    headerMenu: "main-menu",
    myAccountMenu: "my-account-menu",
    sidebarName: "right-sidebar",
    topBarName: "top-bar",
    footerName: "footer",
    defaultLoginHref: "/login",
    defaultRegisterHref: "/register",
    defaultLogoutHref: "/logout",
    defaultUserAccountHref: "/my-account",
    gridItems: {
        retail: {
            [LISTINGS_GRID_COMPACT]: ProductItemCompact,
            [LISTINGS_GRID_LIST]: ProductItemList,
            [LISTINGS_GRID_DETAILED]: ProductItemDetailed,
            modal: RetailInfoModal,
            single: RetailItemView
        },
        events: {
            [LISTINGS_GRID_COMPACT]: EventItemCompact,
            [LISTINGS_GRID_LIST]: EventItemList,
            [LISTINGS_GRID_DETAILED]: EventItemDetailed,
            modal: EventInfoModal,
            single: EventItemView
        },
        ["real-estate"]: {
            [LISTINGS_GRID_COMPACT]: RealEstateItemCompact,
            [LISTINGS_GRID_LIST]: RealEstateItemList,
            [LISTINGS_GRID_DETAILED]: RealEstateItemDetailed,
            modal: RealEstateInfoModal,
            single: RealEstateItemView
        },
    }
}