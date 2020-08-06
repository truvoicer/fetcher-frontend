import MenuList from "./MenuList";
import React from 'react';

class FooterMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h2 className="footer-heading mb-4">{this.props.data.title}</h2>
                <MenuList data={this.props.data}/>
            </>
        )
    }
}

export default FooterMenu;