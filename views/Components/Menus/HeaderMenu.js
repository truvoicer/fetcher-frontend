import MenuList from "./MenuList";
import React from 'react';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="menu" className={"horizontal-nav"}>
                <MenuList data={this.props.data}/>
            </nav>
        )
    }
}

export default HeaderMenu;