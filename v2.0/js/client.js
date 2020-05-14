
var client_js_ua = window.navigator.userAgent.toLowerCase();
var client_js_selector = "body";
function client_js_addClass(className) {
    $(client_js_selector).addClass(className);
    return;
}
function client_js_removeClass(className) {
    $(client_js_selector).removeClass(className);
    return;
}

// browser
if(client_js_ua.indexOf("edge") !== -1 || client_js_ua.indexOf("edga") !== -1 || client_js_ua.indexOf("edgios") !== -1) {
    client_js_addClass("edge");
} else if(client_js_ua.indexOf("chrome") !== -1 || client_js_ua.indexOf("crios") !== -1) {
    client_js_addClass("chrome");
} else if(client_js_ua.indexOf("firefox") !== -1 || client_js_ua.indexOf("fxios") !== -1) {
    client_js_addClass("firefox");
} else if(client_js_ua.indexOf("safari") !== -1) {
    client_js_addClass("safari");
} else if (client_js_ua.indexOf("msie") !== -1 || client_js_ua.indexOf("trident") !== -1) {
    client_js_addClass("ie");
} else if (client_js_ua.indexOf("line") !== -1) {
    client_js_addClass("line");
}

// os
if(client_js_ua.indexOf("windows nt") !== -1) {
    client_js_addClass("win");
} else if(client_js_ua.indexOf("android") !== -1) {
    client_js_addClass("android");
} else if(client_js_ua.indexOf("iphone") !== -1 || client_js_ua.indexOf("ipad") !== -1) {
    client_js_addClass("ios");
} else if(client_js_ua.indexOf("mac os x") !== -1) {
    client_js_addClass("mac");
}

// device
function client_js_setWindowSize() {
    var _devices = ["phone", "tablet", "pc"];
    for (var i = 0; i < _devices.length; i++) {
        client_js_removeClass(_devices[i]);
    }
    if (window.innerWidth <= 639) {
        client_js_addClass(_devices[0]);
    } else if (window.innerWidth <= 1199) {
        client_js_addClass(_devices[1]);
    } else {
        client_js_addClass(_devices[2]);
    }
}
$(window).resize(client_js_setWindowSize);
client_js_setWindowSize();
