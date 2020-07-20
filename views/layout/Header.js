import HeaderMenu from "../Components/Menus/HeaderMenu";
import {SiteContext} from "../Context/SiteContext";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            {
                this.context.siteData ?
                    <header id="header">
                        <a href="/" className="logo"><strong>{this.context.siteData.name}</strong></a>

                        <HeaderMenu/>
                        <ul className="icons">
                            <li><a href="#" className="icon brands fa-twitter"><span
                                className="label">Twitter</span></a></li>
                            <li>
                                <a href="#" className="icon brands fa-facebook-f"><span
                                    className="label">Facebook</span></a>
                            </li>
                            <li>
                                <a href="#" className="icon brands fa-snapchat-ghost"><span
                                    className="label">Snapchat</span></a></li>
                            <li><a href="#" className="icon brands fa-instagram"><span
                                className="label">Instagram</span></a>
                            </li>
                            <li><a href="#" className="icon brands fa-medium-m"><span
                                className="label">Medium</span></a></li>
                        </ul>
                    </header>
                    :
                    <p>loading</p>
            }
            </>
        )
    }
}
Header.contextType = SiteContext;
export default Header;