import React from 'react';

const SocialIconsWidget = (props) => {
    return (
        <>
            <h2 className="footer-heading mb-4">{props.data.title}</h2>
            {props.data.facebook &&
            <a href={props.data.facebook} className="pl-0 pr-3"><span className="icon-facebook"/></a>
            }
            {props.data.twitter &&
            <a href={props.data.twitter} className="pl-0 pr-3"><span className="icon-twitter"/></a>
            }
            {props.data.instagram &&
            <a href={props.data.instagram} className="pl-0 pr-3"><span className="icon-instagram"/></a>
            }
            {props.data.linkedin &&
            <a href={props.data.linkedin} className="pl-0 pr-3"><span className="icon-linkedin"/></a>
            }
        </>
    );
}
export default SocialIconsWidget;
