import React, {useState} from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MaterialMenuList from "./MaterialMenuList";

const MobileDrawerMenu = (props) =>  {
    const [showMenu, setShowMenu] = useState(false)

    const openDrawer = () => {
        setShowMenu(true)
    }

    const closeDrawer = () => {
        setShowMenu(false)
    }

    return (
        <div className="col-6 d-block d-xl-none site-mobile-menu text-right">
            <a onClick={openDrawer}
               className="site-menu-toggle js-menu-toggle text-white">
                <span className="icon-menu h3"/>
            </a>
            <SwipeableDrawer
                anchor={"right"}
                open={showMenu}
                onClose={closeDrawer}
                onOpen={openDrawer}
            >
                <div
                    className={""}
                    role="presentation"
                    onClick={closeDrawer}
                    onKeyDown={closeDrawer}
                >
                    <MaterialMenuList data={props.data} sessionLinks={true}/>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default MobileDrawerMenu;