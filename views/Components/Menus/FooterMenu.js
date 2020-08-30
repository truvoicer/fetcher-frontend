import MenuList from "./MenuList";
import React from 'react';

const FooterMenu = (props) => {
    return (
        <>
            <h2 className="footer-heading mb-4">{props.data.title}</h2>
            <MenuList data={props.data}/>
        </>
    )
}
export default FooterMenu;