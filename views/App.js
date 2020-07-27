import SidebarComponent from "./Components/Sidebars/LeftSidebar";
import PageComponent from "./Components/Pages/Page";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            {this.props.data.pageName !== "" &&
                            <PageComponent data={this.props.data}/>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default FetcherApp;