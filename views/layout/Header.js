import TopBar from "../Components/Sidebars/TopBar";
import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>

               <TopBar />
            </>
        )
    }
}

export default Header;