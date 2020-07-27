const sprintf = require("sprintf").sprintf;
import React from 'react';

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.showSubMenu = this.showSubMenu.bind(this)
    }

    showSubMenu(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }

    render() {
        return (
            <ul>
                {this.props.data.menu_items.map((item, index) => (
                    item.menu_sub_items
                        ?
                        <li key={this.props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                            <span className="opener" onClick={this.showSubMenu}>{item.menu_item.title}</span>
                            <ul>
                                {item.menu_sub_items.map((subItem, subIndex) => (
                                    <li key={this.props.sidebar + "_sidebar_sub_menu_item_" + index + subIndex}>
                                        <a href={"/" + subItem.title.toLowerCase()}>{subItem.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        :
                        <li key={this.props.sidebar + "_sidebar_menu_item_" + index.toString()}>
                            <a href={"/" + item.menu_item.title.toLowerCase()}>{item.menu_item.title}</a>
                        </li>

                ))}
            </ul>
        )
    }
}

export default MenuList;