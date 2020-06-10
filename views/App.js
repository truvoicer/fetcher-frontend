import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
        this.setPageData = this.setPageData.bind(this)
        const setListingsData = (data) => {
            // console.log(data)
            this.setState(state => ({
                listings: {
                    listingsData: data,
                }
            }));
        }
        this.state = {
            listings: {
                listingsData: {},
                setListingsData: setListingsData
            },
            page: {
                pageData: {},
                setPageData: this.setPageData(),
            }
        }
    }
    setPageData(data) {
        this.setState(state => ({
            page: {
                pageData: data
            }
        }));
    }
    render() {
        return (
            <PageContext.Provider value={this.state.page}>
                <ListingsContext.Provider value={this.state.listings}>
                    <div id="wrapper">
                        <div id="main">
                            <div className="inner">
                                <PageComponent data={this.props.data} setPageData={this.setPageData}/>
                            </div>
                        </div>
                        <Sidebar/>
                    </div>
                </ListingsContext.Provider>
            </PageContext.Provider>
        )
    }
}
export default FetcherApp;