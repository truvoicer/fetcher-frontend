import {wpApiConfig} from "../config/wp-api-config";

export const filterHtml = (node, index) => {
    if (node.type === 'tag' && node.name === 'div') {
        if(typeof node.attribs.id !== "undefined" &&
            typeof wpApiConfig.widgets[node.attribs.id] !== "undefined")
        return <wpApiConfig.widgets.listing_block.component key={index}/>;
    }
}