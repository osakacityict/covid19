
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// ローカルナビの作成
function createLocalNav() {

    // アコーディオン
    var _accordion = $("#local-nav-accordion");
    if (_accordion.length > 0) {
        var param;
        if (window.matchMedia && window.matchMedia('(max-device-width: 959px)').matches) {
            param = {active: false};
        } else {
            param = {active: 0};
        }
        UIkit.accordion(_accordion, param);
    }

    // ローカルナビ
    var _selector = "#local-nav-list";
    var _nav = $(_selector);
    if (_nav.length > 0) {
        
        var id = url.getParam("page");
        var target = url.getParam("target");
        var category = url.getParam("category");
        var _fn = url.getFileName();
        if (target == tm.const.target.kojin) {
            // 更新日順ビュー
            supports.sortByLastupdate();
        } else if (target == tm.const.target.jigyousha) {
            // 標準ビュー
            supports.sortByNumber();
        }

        var s = '';
        s += '<ul class="uk-list uk-list-large">';
        for (var i = 0; i < targets.items.length; i++) {
            var _target = targets.items[i];
            s += '<li>';
            var _class_target = '';
            if (target == _target && (!category || category == "" || category == tm.const.category.all)) {
                _class_target = ' class="active"';
            }
            s += '<a' + _class_target + ' href="search.html?target=' + encodeURI(_target) + '">' + _target + tm.const.target.suffix + '</a>';
            if (target == _target) {
                s += '<ul class="uk-list uk-padding-remove">';
                for (var j = 0; j < categories.items.length; j++) {
                    var _category = categories.items[j];
                    if (_category.target == _target) {
                        s += '<li>';
                        var _class_category = '';
                        if (_fn == "search" && category == _category.name) {
                            _class_category = ' class="active"';
                        }
                        s += '<a' + _class_category + ' href="search.html?target=' + encodeURI(_target) + '&category=' + encodeURI(_category.name) + '">' + _category.name + '</a>';
                        if (_fn == "support") {
                            if (category == _category.name) {
                                s += '<ul class="uk-list uk-padding-remove">';
                                var _count = 0;
                                for (var k = 0; k < supports.items.length; k++) {
                                    var _support = supports.items[k];
                                    if (_support.category[tm.const.target[_target]].indexOf(_category.name) != -1) {
                                        _count += 1;
                                        var _class = "";
                                        if (_count == 6) {
                                            s += '<a class="uk-button uk-button-primary uk-button-small uk-margin-bottom showall" href="#">すべて表示</a>';
                                        }
                                        if (_count >= 6) {
                                            _class = ' class="hidden"';
                                        }
                                        var _class_support = '';
                                        if (String(id) == String(_support.id)) {
                                            _class_support = ' class="active"';
                                        }
                                        s += '<li' + _class + '>';
                                        s += '<a' + _class_support + ' href="support.html?target=' + encodeURI(_target) + '&category=' + encodeURI(_category.name) + '&page=' + _support.id + '">' + _support.title + '</a>';
                                        s += '</li>';
                                    }
                                }
                                s += '</ul>';
                            }    
                        }
                        s += '</li>';
                    }
                }
                s += '</ul>';
            }
            s += '</li>';
        }
        s += '</ul>';

        $(_nav).html(s);
        $(_selector + " .showall").click(function(){
            $(_selector + " .hidden").show();
            $(this).hide();
            return false;
        });
    }
}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createLocalNav);
