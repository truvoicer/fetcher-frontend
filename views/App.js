import {AddAxiosInterceptors, LoadEnvironment} from "../library/api/global-scripts"
import React from "react";
import Header from "./layout/Header";
import Site from "./Components/Pages/Site";
import Footer from "./layout/Footer";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AddAxiosInterceptors();
        LoadEnvironment();
    }

    render() {
        return (
            <div className="site-wrap">

                <Header/>
                <Site />


            <Footer />
            </div>

        )
    }
}

export default FetcherApp;