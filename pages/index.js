import React from "react";
import FetcherApp from "../views/App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../redux/store/index";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                pageName: "home"
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
            <FetcherApp data={this.state.data}/>
            </Provider>
        )
    }
}

export default Home;