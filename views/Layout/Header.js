import TopBar from "../Components/Sidebars/TopBar";
import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>

               <TopBar />
            </>
        )
    }
}

export default Header;