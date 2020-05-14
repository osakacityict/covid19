
var url = {

    // URLパラメータを返す
    getParam: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    // 現在表示中htmlのファイル名を返す
    getFileName: function() {
        var filename = "";
        var url = window.location.href;
        var buf = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$");
        if (buf) {
            filename = buf[1];
        } else {
            filename = "";
        }
        return filename;
    }

};
