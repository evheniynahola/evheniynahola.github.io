/**
 * These functions are common to all site scripts
 */
/*
 * Сheck that this client is a mobile device
 * @returns {boolean}
 */
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        (!!logger) && logger.trace('isMobile');
        return true;
    } else if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
        (!!logger) && logger.trace('isMobile');
        return true;
    }
    return false;
}
/*
 * Check that this client is not a mobile device
 * @returns {boolean}
 */
function isNotMobile() {
    (!!logger) && !(isMobile()) && logger.trace('not Mobile');
    return !(isMobile());
}