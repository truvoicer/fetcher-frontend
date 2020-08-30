import React from 'react';

const TextWidget = (props) => {
    return (
        <>
            <h2 className="footer-heading mb-4">{props.data.title}</h2>
            <p>{props.data.text}</p>
        </>
    );
}

export default TextWidget;
