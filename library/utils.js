const DateFormat = require("dateformat");

export const formatDate = (dateString, formatString = "dd mmmm yyyy") => {
    if (!isSet(dateString)) {
        return null;
    }
    let date = new Date(dateString);
    console.log(date)
    if (isSet(date)) {
        return DateFormat(date, formatString);
    }
    return null
}

export const isSet = (item) => {
    if (typeof item === "undefined") {
        return false
    }
    return true;
}

export const imageSelector = (imageSize = "medium", imageArray = []) => {
    // console.log(imageArray)
    if (imageArray.length === 0) {
        return false;
    }
    let sizes = {
        xsmall: {
            min: 0,
            max: 50
        },
        small:  {
            min: 51,
            max: 100
        },
        medium:  {
            min: 101,
            max: 600
        },
        large:  {
            min: 601,
            max: 2048
        },
        xlarge:  {
            min: 2049,
            max: 6000
        }
    }
    let image = imageArray.filter((item) => {
        if (item.width >= sizes[imageSize].min && item.width <= sizes[imageSize].max) {
            return true;
        }
    })
    if (image.length > 0) {
        return image[0];
    }
    return false;
}