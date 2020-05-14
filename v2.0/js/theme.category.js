
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// 分類一覧の作成
function createCategoryListView() {

    var hero_menu = {
        id: "hero-menu",
        selector: "#hero-menu"
    }

    // 分類一覧の作成
    if ($(hero_menu.selector).length > 0) {

        // 分類一覧の作成用 分類のソースを返す
        function getCategorySource(target, name, icon) {
            var s = 
                '<div>' +
                    '<div class="uk-card uk-card-default uk-card-hover">' +
                        '<a href="search.html?target=' + encodeURI(target) + '&category=' + encodeURI(name) + '" class="tm-category">' +
                            '<div>' +
                                '<div class="uk-card-header">' +
                                    '<div class="uk-grid-small uk-flex-middle" uk-grid>' +
                                        '<div class="uk-width-auto">' +
                                            '<img width="80" height="80" src="' + icon + '?version=0.1">' +
                                        '</div>' +
                                        '<div class="uk-width-expand">' +
                                            '<h4 class="uk-h4 uk-margin-remove-bottom">' + name + '</h4>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</div>';
            return s;
        }
        
        // 分類一覧を作成する
        function writeCategoriesSource(id, target) {
            var icon_dir = String(id).split("-")[String(id).split("-").length - 1];
            var s = getCategorySource(target, tm.const.category.all, "img/" + icon_dir + "/00.svg");
            for (var i = 0; i < categories.items.length; i++) {
                if (categories.items[i].target == target) {
                    s += getCategorySource(
                        categories.items[i].target,
                        categories.items[i].name,
                        categories.items[i].icon
                    );
                }
            }
            $("#" + id + ' > .tm-categories').html(s);
        }

        // hero-menu
        if ($(hero_menu.selector).length > 0) {
            for (var i = 0; i < targets.items.length; i++) {
                var _target = targets.items[i];
                writeCategoriesSource("hero-menu-" + tm.const.target[_target], _target);
            }
        }
        
        // 余白調整
        if (window.matchMedia && window.matchMedia('(max-device-width: 360)').matches) {
            $(hero_menu.selector + " > li > div").addClass("uk-grid-small");
        }
    }
}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createCategoryListView);
