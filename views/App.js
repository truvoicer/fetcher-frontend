import SidebarComponent from "./Components/Sidebars/LeftSidebar";
import PageComponent from "./Components/Pages/Page";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Header from "./layout/Header";
import Site from "./Components/Pages/Site";
import Footer from "./layout/Footer";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AddAxiosInterceptors();
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