import MenuList from "./MenuList";
import React from 'react';

class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <nav id="menu">
                <header className="major">
                    {this.props.data.title}
                </header>
                <MenuList data={this.props.data} />
            </nav>
        )
    }
}

export default SidebarMenu;