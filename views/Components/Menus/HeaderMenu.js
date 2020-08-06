import MenuList from "./MenuList";
import React from 'react';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-12 col-md-10 d-none d-xl-block">
                <nav className="site-navigation position-relative text-right" role="navigation">
                    <MenuList data={this.props.data}/>
                </nav>
            </div>
        )
    }
}

export default HeaderMenu;