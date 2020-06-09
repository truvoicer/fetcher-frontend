import React from "react";
import FetcherApp from "../views/App";

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
            <FetcherApp data={this.state.data}/>
        )
    }
}

export default Home;