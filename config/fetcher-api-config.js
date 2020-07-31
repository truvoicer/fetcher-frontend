export const fetcherApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_FETCHER_API_URL,
    email: "truvoice@local.com",
    password: "Deelite4",
    endpoints: {
        getToken: "login",
        list: "category/%s/%s",
        operation: "operation/%s/",
    },
    queryKey: "query",
    searchLimitKey: "limit",
    defaultSearchLimit: 10,
    defaultOperation: "list"
}