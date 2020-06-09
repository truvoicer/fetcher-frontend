import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);

        this.listingsDataProcess = (data) => {
            console.log(data)
            this.setState(state => ({
                listings: {
                    listingsName: "",
                    listingsData: {},
                }
            }));
        };
        this.state = {
            listings: {
                listingsName: "",
                listingsData: {},
                listingsDataProcess: this.listingsDataProcess
            }
        }
    }

    render() {
        return (
            <ListingsContext.Provider value={this.state.listings}>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">
                        <PageComponent data={this.props.data}/>
                    </div>
                </div>
                <Sidebar/>
            </div>
            </ListingsContext.Provider>
        )
    }
}
FetcherApp.context_type = ListingsContext;
export default FetcherApp;