const Apify = require('apify');
const { EnumURLTypes, EnumBaseUrl } = require('./constants');

const { log } = Apify.utils;
log.setLevel(log.LEVELS.DEBUG);

const getSearchUrl = (keyword) => {
    console.log(EnumBaseUrl);
    return `${EnumBaseUrl.SEARCH}/${keyword}`;
};

const getProductIdFromURL = (productUrl) => {
    const params = new URLSearchParams(productUrl.split('?')[1]);
    return params.get('ID');
};

const getUrlType = (url) => {
    if (url.match(/macys\.com\/*$/)) {
        return EnumURLTypes.START_URL;
    }

    if (url.match(/macys\.com(\/shop)?\/product\/.+/)) {
        return EnumURLTypes.PRODUCT;
    }

    if (url.match(/macys\.com\/shop\/.+/)) {
        return EnumURLTypes.CATEGORY;
    }
    if (url.match(/macys\.com\/shop\/featured\/.+/)) {
        return EnumURLTypes.SEARCH;
    }

    return null;
};

const isObject = val => typeof val === 'object' && val !== null && !Array.isArray(val);

module.exports = {
    getUrlType,
    getSearchUrl,
    getProductIdFromURL,
    isObject,
    log,
};
