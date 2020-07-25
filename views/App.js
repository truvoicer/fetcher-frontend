import SidebarComponent from "./layout/SidebarComponent";
import PageComponent from "./Components/Page";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import React from "react";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AddAxiosInterceptors();
    }

    render() {
        return (

            <div id="wrapper">
                <SidebarComponent/>
                <div id="main">
                    {this.props.data.pageName !== "" &&
                    <PageComponent data={this.props.data}/>
                    }
                </div>
            </div>
        )
    }
}

export default FetcherApp;