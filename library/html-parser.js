import {wpApiConfig} from "../config/wp-api-config";
import React from "react";

export const filterHtml = (node, index) => {
    if (node.type === 'tag' && node.name === 'div') {
        if(typeof node.attribs.id !== "undefined" &&
            typeof wpApiConfig.widgets[node.attribs.id] !== "undefined")
        {
            const Component = wpApiConfig.widgets[node.attribs.id].component;
            return <Component key={index}/>;
        }
    }
}