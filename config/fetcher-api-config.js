export const fetcherApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_FETCHER_API_URL,
    endpoints: {
        getToken: "admin/user/api-token/authenticate",
        list: "category/%s/%s",
        operation: "operation/%s/",
    },
    queryKey: "query",
    searchLimitKey: "limit",
    defaultSearchLimit: 10,
    defaultOperation: "list"
}