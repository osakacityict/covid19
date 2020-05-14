
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// ボタンの作成
function createButton() {

    // 戻るボタン
    if ($(".back").length > 0) {
        var p = "";
        ["target", "category", "page", "keyword"].forEach(function(name){
            var value = url.getParam(name);
            if (value) {
                if (value != "") {
                    if (p != "") {p += "&";}
                    p += name + "=" + encodeURI(value);
                }
            }
        });
        if (p != "") {
            $(".back a").each(function(i, e){
                $(e).attr("href", $(e).attr("href") + "?" + p);
            });
        }
    }

}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createButton);
