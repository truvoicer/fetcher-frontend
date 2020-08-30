import {AddAxiosInterceptors, LoadEnvironment} from "../library/api/global-scripts"
import React from "react";
import Header from "./Layout/Header";
import Site from "./Templates/Site";
import Footer from "./Layout/Footer";
import {validateToken} from "../redux/actions/session-actions";

const FetcherApp = (props) => {
    AddAxiosInterceptors();
    LoadEnvironment();
    validateToken();
    return (
        <div className="site-wrap">
            <Header/>
            <Site />
            <Footer />
        </div>

    )
}

export default FetcherApp;