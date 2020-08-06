import React from "react";
import {connect} from "react-redux";
import {getPageData} from "../../redux/middleware/page-middleware";
import {isSet} from "../../library/utils";

class HeroBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let heroData;
        if (isSet(this.props.blocksData) && isSet(this.props.blocksData.tru_fetcher_hero)) {
            heroData = this.props.blocksData.tru_fetcher_hero;
        }
        return (
            <div className="site-blocks-cover inner-page-cover overlay"
                 style={{backgroundImage: "url('" + (heroData && heroData.hero_background_image? heroData.hero_background_image : "") + "')"}}>
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">

                        <div className="col-md-10" data-aos="fade-up" data-aos-delay="400">


                            <div className="row justify-content-center mt-5">
                                <div className="col-md-8 text-center">
                                    <h1>{heroData && heroData.hero_title? heroData.hero_title : ""}</h1>
                                    <p className="mb-0">{heroData && heroData.hero_text? heroData.hero_text : ""}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}function mapStateToProps(state) {
    // console.log(state)
    return {
        blocksData: state.page.blocksData
    };
}

export default connect(
    mapStateToProps
)(HeroBlock);