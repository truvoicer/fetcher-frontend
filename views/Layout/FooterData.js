import {connect} from "react-redux";
import React from "react";
import FooterMenu from "../Components/Menus/FooterMenu";
import TextWidget from "../Components/Widgets/TextWidget";
import SocialIconsWidget from "../Components/Widgets/SocialIconsWidget";

const FooterData = (props) => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    {props.footerData.length > 0 &&
                    <>
                        {props.footerData.map((item, index) => (
                            <div className={"col"} key={index.toString()}>

                                {item.nav_menu &&
                                <FooterMenu data={item.nav_menu} sidebar={"footer"}/>
                                }
                                {item.text &&
                                <TextWidget data={item.text} />
                                }
                                {item.social_media_widget &&
                                <SocialIconsWidget data={item.social_media_widget} />
                                }

                            </div>
                        ))}
                    </>
                    }
                </div>
                <div className="row pt-5 mt-5 text-center">
                    <div className="col">
                        <div className="border-top pt-5">
                            <p>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

function mapStateToProps(state) {
    return {
        footerData: state.page.footer
    };
}

export default connect(
    mapStateToProps,
    null
)(FooterData);