import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/wp/middleware";
import Head from "next/head";
import {getToken, setSession} from "../library/api/fetcher/session/authenticate";
import {fetchData, isEmpty} from "../library/api/fetcher/middleware";
import {Listings} from "../library/states/listings";
import {PageState} from "../library/states/page";
import {Site} from "../library/states/site";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
        this.listingsState = new Listings(this);
        this.pageState = new PageState(this);
        this.siteState = new Site(this);
        this.listingsState.init();
        this.pageState.init();
        this.siteState.init();
    }

    componentDidMount() {
        this.listingsState.setCallbacks();
        this.pageState.setCallbacks();
        this.setSiteData();
    }

    setSiteData() {
        fetchWpSiteData().then((response) => {
            this.siteState.setData(response.data)
        })
    }

    render() {
console.log(this.pageState.state)
        return (
            <SiteContext.Provider value={this.siteState.state}>
                <PageContext.Provider value={this.pageState.state}>
                    <ListingsContext.Provider value={this.listingsState.state}>

                        <div id="wrapper">
                            <div id="main">
                                <div className="inner">
                                    <PageComponent data={this.props.data}
                                                   setPageData={this.pageState.state.updatePageData}
                                                   // setListingsProviders={this.listingsState.state.updateListingsProvidersData}
                                                   setListingsData={this.listingsState.state.updateListingsData}/>
                                </div>
                            </div>
                            <Sidebar listingsData={this.listingsState.getData()}/>
                        </div>
                    </ListingsContext.Provider>
                </PageContext.Provider>
            </SiteContext.Provider>
        )
    }
}

export default FetcherApp;