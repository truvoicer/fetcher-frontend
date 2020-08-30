import MenuList from "./MenuList";
import React from 'react';

const SidebarMenu = (props) => {
    // console.log(this.props)
    return (
        <nav id="menu">
            <header className="major">
                {props.data.title}
            </header>
            <MenuList data={props.data} />
        </nav>
    )
}
export default SidebarMenu;