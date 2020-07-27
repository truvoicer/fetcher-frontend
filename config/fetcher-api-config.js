export const fetcherApiConfig = {
    apiBaseUrl: "http://localhost:8081/api/",
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