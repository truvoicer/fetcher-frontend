import {connect} from "react-redux";
import {getSidebarData} from "../../redux/middleware/sidebar-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {FOOTER_REQUEST, SIDEBAR_REQUEST} from "../../redux/constants/sidebar-constants";
import React from "react";
import Search from "../Components/Widgets/Search";
import ListingsFilter from "../Components/Widgets/Listings/ListingsFilter/ListingsFilter";
import SidebarMenu from "../Components/Menus/SidebarMenu";
import FooterMenu from "../Components/Menus/FooterMenu";
import TextWidget from "../Components/Widgets/TextWidget";
import SocialIconsWidget from "../Components/Widgets/SocialIconsWidget";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.getFooter = this.getFooter.bind(this)
    }

    componentDidMount() {
        this.getFooter();
    }

    getFooter() {
        this.props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.footer), FOOTER_REQUEST)
    }

    render() {
        return (
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        {this.props.footerData.length > 0 &&
                        <>
                            {this.props.footerData.map((item, index) => (
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
}

function mapStateToProps(state) {
    return {
        footerData: state.page.footer
    };
}

export default connect(
    mapStateToProps,
    {getSidebarData}
)(Footer);