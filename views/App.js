import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/wp/middleware";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import {fetchData, isEmpty, responseHandler} from "../library/api/fetcher/middleware";
import {runSearch} from "../library/api/fetcher/search";
import {isSet} from "../library/utils";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: {},
            page: {},
            site: {
                siteData: {}
            }
        }
        this.setPageData = this.setPageData.bind(this)
        this.setListingsData = this.setListingsData.bind(this)
        this.setListingsQueryData = this.setListingsQueryData.bind(this)
        this.setListingsProviders = this.setListingsProviders.bind(this)
        this.setListingsSearchResults = this.setListingsSearchResults.bind(this)
        this.setListingsRequestStatus = this.setListingsRequestStatus.bind(this)
        this.initialSearch = this.initialSearch.bind(this)
        this.getProvidersCallback = this.getProvidersCallback.bind(this)
        this.setSiteData = this.setSiteData.bind(this)
    }

    componentDidMount() {
        AddAxiosInterceptors();
        this.setState({
            listings: {
                listingsData: {},
                listingsQueryData: {},
                listingsSearchResults: {},
                listingsRequestStatus: false,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setlistingsQueryData: this.setListingsQueryData,
                setListingsRequestStatus: this.setListingsRequestStatus
            },
            page: {
                pageData: {},
                setPageData: this.setPageData,
            }
        })
        this.setSiteData();
    }

    setSiteData() {
        fetchWpSiteData().then((response) => {
            this.setState({
                site: {
                    siteData: {
                        name: response.data.name,
                        description: response.data.description,
                        siteUrl: response.data.url,
                        homeUrl: response.data.home,
                        gmtOffset: response.data.gm_offset,
                        timezoneString: response.data.timezone_string
                    }
                }
            })
        })
    }

    setPageData(data) {
        this.setState(state => ({
            page: {
                pageData: data,
                setPageData: this.setPageData
            }
        }));
    }

    setListingsProviders(data) {
        if (!isEmpty(data)) {
            let category = data.listing_block_category;
            fetchData("list", [category, "providers"], {}, this.getProvidersCallback);
        }
    }
    getProvidersCallback(status, data) {
        if (status === 200) {
            let listingsData = this.state.listings.listingsData;
            listingsData.providers = data.data;
            this.setListingsData(listingsData)
            this.initialSearch()
            return
        }
        console.error(data.message)
    }

    setListingsRequestStatus(status) {
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: this.state.listings.listingsSearchResults,
                listingsRequestStatus: status,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData,
                setListingsRequestStatus: this.setListingsRequestStatus
            }
        }));
    }

    setListingsData(data) {
        this.setState(state => ({
            listings: {
                listingsData: data,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: this.state.listings.listingsSearchResults,
                listingsRequestStatus: this.state.listings.listingsRequestStatus,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData,
                setListingsRequestStatus: this.setListingsRequestStatus
            }
        }));
    }
    setListingsQueryData(data, refresh = true) {
        // console.log(data)
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: data,
                listingsSearchResults: (refresh)? {} : this.state.listings.listingsSearchResults,
                listingsRequestStatus: this.state.listings.listingsRequestStatus,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData,
                setListingsRequestStatus: this.setListingsRequestStatus
            }
        }));
        let listings = this.state.listings
        runSearch(this.setListingsSearchResults, listings)
    }

    initialSearch() {
        if (!isSet(this.state.listings.listingsData)) {
            return false;
        }
        if (!isSet(this.state.listings.listingsData.initial_search)) {
            return false;
        }
        let initialSearch = this.state.listings.listingsData.initial_search;
        if (!isSet(initialSearch.search_type || !isSet(initialSearch.search_value))) {
            return false;
        }
        // console.log(initialSearch)
        let queryData = {};
        if (initialSearch.search_type === "keywords") {
            queryData.keywords = initialSearch.search_value;
        } else if (initialSearch.search_type === "location") {
            queryData.location = initialSearch.search_value;
        }
        console.log(queryData)
        this.setListingsQueryData(queryData)
    }

    setListingsSearchResults(status, data, completed = false) {
        let listItems = [];
        if (!isSet(this.state.listings.listingsSearchResults.listItems) ||
            this.state.listings.listingsSearchResults.listItems.length === 0
        ) {
            listItems = data.listItems;
        } else if (this.state.listings.listingsSearchResults.listItems.length > 0) {
            listItems = this.state.listings.listingsSearchResults.listItems;
            for (let i=0;i<data.listItems.length;i++) {
                listItems.push(data.listItems[i]);
            }
        }
        console.log(completed)
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: {
                    listData: data.listData,
                    listItems: listItems,
                    requestService: data.requestService,
                    provider: data.provider
                },
                listingsRequestStatus: completed,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData,
                setListingsRequestStatus: this.setListingsRequestStatus
            }
        }));
    }

    render() {
        return (
            <SiteContext.Provider value={this.state.site}>
                <PageContext.Provider value={this.state.page}>
                    <ListingsContext.Provider value={this.state.listings}>

                        <div id="wrapper">
                            <Sidebar listingsData={this.state.listings.listingsData}/>
                            <div id="main">
                                    <PageComponent data={this.props.data} setPageData={this.setPageData}
                                                   setListingsData={this.setListingsData} setListingsProviders={this.setListingsProviders}/>
                            </div>
                        </div>
                    </ListingsContext.Provider>
                </PageContext.Provider>
            </SiteContext.Provider>
        )
    }
}

export default FetcherApp;