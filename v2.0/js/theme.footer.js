
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// フッターの作成
function createFooter() {

    if ($("#footer").length > 0) {
        for (var i = 0; i < targets.items.length; i++) {
            var s = '<div><h4><a href="search.html?target=' + encodeURI(targets.items[i]) + '&category=' + encodeURI(tm.const.category.all) + '">' + targets.items[i] + 'の方へ</a></h4><ul class="uk-list uk-margin-remove-top">';
            for (var j = 0; j < categories.items.length; j++) {
                if (targets.items[i] == categories.items[j].target) {
                    s += '<li><a class="left-arrow" href="search.html?target=' + encodeURI(targets.items[i]) + '&category=' + encodeURI(categories.items[j].name) + '">' + categories.items[j].name + '</a></li>';
                }
            }
            s += '</ul></div>';
            $("#footer .sitemap").append($(s));
        }
    }

}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createFooter);
