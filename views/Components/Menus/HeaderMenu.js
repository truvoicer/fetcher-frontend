import MenuList from "./MenuList";
import React from 'react';

const HeaderMenu = (props) => {
    return (
        <div className="col-12 col-md-10 d-none d-xl-block">
            <nav className="site-navigation position-relative text-right" role="navigation">
                <MenuList data={props.data} sessionLinks={true}/>
            </nav>
        </div>
    )
}
export default HeaderMenu;