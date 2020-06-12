export const fetcherApiConfig = {
    apiBaseUrl: "http://localhost:8001/",
    email: "truvoice@local.com",
    password: "Deelite4",
    endpoints: {
        getToken: "api/login",
        events: {
            search: "event/query",
            get: "event/get"
        },
        retail: {
            search: "item/query",
            get: "item/get",
        }
    }
}