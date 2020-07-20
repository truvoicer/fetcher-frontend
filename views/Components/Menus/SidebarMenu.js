import {wpApiConfig} from "../../../config/wp-api-config";
import useSwr from "swr";
import {siteConfig} from "../../../config/site-config";
import Link from "next/link";
const sprintf = require("sprintf").sprintf;
import React from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json())

class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.getMenu = this.getMenu.bind(this)
        this.showSubMenu = this.showSubMenu.bind(this)
    }
    showSubMenu(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }
    getMenu() {
        return (
            <nav id="menu">
                <header className="major">
                    <h2>Menu</h2>
                </header>
                <ul>
                    {this.props.data.menu_items.map((item, index) => (
                    item.menu_sub_items
                        ?
                        <li key={"sidebar_menu_item_"+index.toString()}>
                            <span className="opener" onClick={this.showSubMenu}>{item.menu_item.title}</span>
                            <ul>
                                {item.menu_sub_items.map((subItem, subIndex) => (
                                <li key={"sidebar_sub_menu_item_"+index+subIndex}>
                                    <a href={"/"+subItem.title.toLowerCase()}>{subItem.title}</a>
                                </li>
                                ))}
                            </ul>
                        </li>
                        :
                        <li key={"sidebar_menu_item_"+index.toString()}>
                            <a href={"/"+item.menu_item.title.toLowerCase()}>{item.menu_item.title}</a>
                        </li>

                    ))}
                </ul>
            </nav>
        )
    }

    render() {
        return (
            <this.getMenu/>
        )
    }
}

export default SidebarMenu;