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

                <div className="site-blocks-cover inner-page-cover overlay"
                     style={{backgroundImage: "url(images/hero_2.jpg)"}}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center text-center">

                            <div className="col-md-10" data-aos="fade-up" data-aos-delay="400">


                                <div className="row justify-content-center mt-5">
                                    <div className="col-md-8 text-center">
                                        <h1>Ads Listings</h1>
                                        <p className="mb-0">Choose product you want</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;