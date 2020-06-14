import {fetchData} from "../api/fetcher/middleware";

export class Listings {
    constructor(state) {
        this.state = state;
    }

    init() {
        const updateData = (data) => {
            this.state.setState({
                listingsData: data
            });
        };
        const updateQueryData = (data) => {
            this.state.setState({
                listingsQueryData: data
            });
        };
        const setListingsProviders = (data) => {
            this.state.setState({
                pageData: data
            });
        };
        this.state.setState({
            listingsData: {},
            listingsQueryData: {},
            listingsProvidersData: {},
            updateListingsData: updateData,
            updateListingsQueryData: updateQueryData,
        })
    }
    setCallbacks() {
        this.state.setState({
        })
    }
    updateData(data) {
        this.setData(data);
    }
    updateQueryData(data) {
        this.setQueryData(data);
    }

    setData(data) {
        this.state.setState({
            listingsData: data
        });
    }

    getData() {
        return this.state.listingsData;
    }
    setQueryData(data) {
        this.state.setState({
            listingsQueryData: data
        });
    }
    getQueryData() {
        return this.state.listingsQueryData;
    }
    setProvidersData(data) {
        this.state.setState({
            listingsProvidersData: data
        });
    }
    getProvidersData() {
        return this.state.listingsProvidersData;
    }

    setListingsProviders(category) {
        console.log(category)
        fetchData("list", [category, "providers"])
            .then((response) => {
                console.log(response.data.data)
                this.setProvidersData(response.data.data)
            }).catch((error) => {
            console.log(error)
        })
    }
}