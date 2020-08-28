import MenuList from "./MenuList";
import React from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import MaterialMenuList from "./MaterialMenuList";

class MobileDrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,

        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer(show, e) {
        this.setState({
            showMenu: show
        })
    }

    render() {
        return (
            <div className="col-6 d-block d-xl-none site-mobile-menu text-right">
                <a onClick={this.toggleDrawer.bind(this, true)}
                   className="site-menu-toggle js-menu-toggle text-white">
                    <span className="icon-menu h3"/>
                </a>
                <SwipeableDrawer
                    anchor={"right"}
                    open={this.state.showMenu}
                    onClose={this.toggleDrawer.bind(this, false)}
                    onOpen={this.toggleDrawer.bind(this, true)}
                >
                    <div
                        className={""}
                        role="presentation"
                        onClick={this.toggleDrawer.bind(false)}
                        onKeyDown={this.toggleDrawer.bind(false)}
                    >
                        <MaterialMenuList data={this.props.data} sessionLinks={true}/>
                    </div>
                </SwipeableDrawer>
            {/*    <nav className="site-navigation position-relative text-right" role="navigation">*/}
            {/*        <MenuList data={this.props.data} sessionLinks={true}/>*/}
            {/*    </nav>*/}
            {/*</div>*/}

            </div>
        )
    }
}

export default MobileDrawerMenu;