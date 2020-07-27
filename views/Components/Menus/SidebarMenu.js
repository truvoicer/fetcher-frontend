import MenuList from "./MenuList";
import React from 'react';

class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav id="menu">
                <header className="major">
                    <h2>Menu</h2>
                </header>
                <MenuList data={this.props.data} />
            </nav>
        )
    }
}

export default SidebarMenu;