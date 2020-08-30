import React from "react";
import {connect} from "react-redux";
import {isSet} from "../../library/utils";
import SearchBar from "./Widgets/Listings/SearchBar";
import { Parallax } from 'react-parallax';

const HeroBlock = (props) => {
    let heroData;
    if (isSet(props.blocksData) && isSet(props.blocksData.tru_fetcher_hero)) {
        heroData = props.blocksData.tru_fetcher_hero;
    }
    return (
        <Parallax
            blur={0}
            bgImage={heroData && heroData.hero_background_image? heroData.hero_background_image : ""}
            bgImageAlt="the cat"
            strength={100}
            className={"site-blocks-cover inner-page-cover overlay"}
            contentClassName={"container"}
            bgClassName={"bgClassName"}
        >
            <div className="row align-items-center justify-content-center text-center">
                <div className="col-md-10">

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8 text-center">
                            <h1>{heroData && heroData.hero_title? heroData.hero_title : ""}</h1>
                            <p className="mb-0">{heroData && heroData.hero_text? heroData.hero_text : ""}</p>
                        </div>
                    </div>
                    {heroData && heroData.hero_search && <SearchBar />}

                </div>
            </div>
        </Parallax>
    )
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        blocksData: state.page.blocksData
    };
}

export default connect(
    mapStateToProps
)(HeroBlock);