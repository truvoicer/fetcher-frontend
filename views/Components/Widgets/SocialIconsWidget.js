import React, {Component} from 'react';

class SocialIconsWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h2 className="footer-heading mb-4">{this.props.data.title}</h2>
                {this.props.data.facebook &&
                <a href={this.props.data.facebook} className="pl-0 pr-3"><span className="icon-facebook"/></a>
                }
                {this.props.data.twitter &&
                <a href={this.props.data.twitter} className="pl-0 pr-3"><span className="icon-twitter"/></a>
                }
                {this.props.data.instagram &&
                <a href={this.props.data.instagram} className="pl-0 pr-3"><span className="icon-instagram"/></a>
                }
                {this.props.data.linkedin &&
                <a href={this.props.data.linkedin} className="pl-0 pr-3"><span className="icon-linkedin"/></a>
                }
            </>
        );
    }
}

export default SocialIconsWidget;
