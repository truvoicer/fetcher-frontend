export const fetcherApiConfig = {
    apiBaseUrl: "http://localhost:8000/api/",
    email: "truvoice@local.com",
    password: "Deelite4",
    endpoints: {
        getToken: "login",
        list: "category/%s/%s",
        operation: "operation/%s/",
    }
}