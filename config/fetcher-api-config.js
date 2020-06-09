export const fetcherApiConfig = {
    apiBaseUrl: process.env.NEXP_PUBLIC_FETCHER_API_BASE_URL,
    endpoints: {
        item_search: "item",
        get_item: "item",
        event_search: "event",
        get_event: "event"
    }
}