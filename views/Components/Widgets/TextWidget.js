import React, {Component} from 'react';

class TextWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h2 className="footer-heading mb-4">{this.props.data.title}</h2>
                <p>{this.props.data.text}</p>
            </>
        );
    }
}

export default TextWidget;
