
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// ヘッダーの作成
function createSearchHeader() {

    // search header
    if ($("#search-title").length > 0) {
        
        var target = url.getParam("target");
        if (target) {
            target = decodeURI(target);
        } else {
            target = tm.const.target.kojin;            
        }
        var _target =  tm.const.target[target];
        var category = url.getParam("category");
        if (category) {
            category = decodeURI(category);
        } else {
            category = tm.const.category.all;
        }

        // target
        $("#search-title-target").html(target + "の方へ");
        if ($("#search-title-target-list").length > 0) {
            var s = "";
            for (var i = 0; i < targets.items.length; i++) {
                s += '<li><a class="left-arrow" href="search.html?target=' + encodeURI(targets.items[i]) + '&category=' + encodeURI(tm.const.category.all) + '">' + targets.items[i] + 'の方へ</a></li>';
            }
            $("#search-title-target-list").html(s);
        }

        // category
        $("#search-title-category").html(category);
        if ($("#search-title-category-list").length > 0) {
            var s = "";
            for (var i = 0; i < categories.items.length; i++) {
                if (categories.items[i].target == target) {
                    s += '<li><a class="left-arrow" href="search.html?target=' + encodeURI(target) + '&category=' + encodeURI(categories.items[i].name) + '">' + categories.items[i].name + '</a></li>';
                }
            }
            $("#search-title-category-list").html(s);
        }

        // result
        $("#result").addClass(_target);
    }
}

// 検索結果の作成
function createSearchResult() {

    var s = "";
    var count = 0;

    // param
    var target = url.getParam("target");
    if (target) {
        target = decodeURI(target);
    } else {
        target = tm.const.target.kojin;            
    }
    var _target =  tm.const.target[target];
    var category = url.getParam("category");
    if (category) {
        category = decodeURI(category);
    } else {
        category = tm.const.category.all;
    }
    var keyword = url.getParam("keyword");
    if (keyword) {
        keyword = decodeURI(keyword);
    } else {
        keyword = "";            
    }
    
    // 支援制度一覧の作成用 支援制度のソースを返す
    function getSupportsSource(supports) {
        for (var i = 0; i < supports.items.length; i++) {
            if (i == 0) {count = 0; s="";}
            if (target == "個人") {
                s += getSupportSource(supports.items[i], supports.items[i].category.kojin);
            } else if (target == "事業者") {
                s += getSupportSource(supports.items[i], supports.items[i].category.jigyousha);
            }
        }
    }
    function getSupportSource(support, categories) {
        if (categories[0] != "") {
            if (category == tm.const.category.all || categories.indexOf(category) != -1) {
                var doc = String(support.id) + "|" + support.title + "|" + support.about + "|" + support.keywords.join("|") + "|" + support.body.text + "|" + support.inquiry.text;
                if (keyword == "" || doc.indexOf(keyword) != -1) {
                    count += 1;
                    var param = "page=" + encodeURI(support.id) + "&target=" + encodeURI(target) + "&category=" + encodeURI(category) + "&keyword=" + encodeURI(keyword);
                    var res = "";
                    if (count == 1) {res += '<hr class="uk-margin-remove">';}
                    res += 
                        '<div id="result-' + support.id + '" class="result-list-item">' +
                            '<a href="support.html?' + param + '">' +
                                '<div>' +
                                    '<div class="result-list-item-body">' +
                                        '<h3>' + support.title + '</h3>' +
                                        '<p class="uk-margin-bottom">' + support.about + '</p>' + 
                                        '<p class="uk-text-meta tag">';
                    if (support.category.kojin[0] != "") {
                        res +=              '<span class="kojin"><span>' + support.category.kojin.join('</span><span>') + '</span>' + '</span>';
                    }
                        if (support.category.jigyousha[0] != "") {
                        res +=              '<span class="jigyousha"><span>' + support.category.jigyousha.join('</span><span>') + '</span>' + '</span>';
                    }
                    res +=              '</p>' +
                                        '<p class="uk-text-meta date">' +
                                            '<span class="uk-margin-right">' +
                                                '<span class="uk-margin-small-right">更新</span>' +
                                                '<span>' + dateFormat.format(support.date.lastupdate, "yyyy年MM月dd日")  + '</span>' + 
                                            '</span>' +
                                            '<span>' +
                                                '<span class="uk-margin-small-right">登録</span>' + 
                                                '<span>' + dateFormat.format(support.date.created, "yyyy年MM月dd日")  + '</span>' + 
                                            '</span>' +
                                        '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</a>' +
                        '</div>' +
                        '<hr class="uk-margin-remove">';
                    return res;
                }
            }
        }
        return "";
    }
    
    if (target == "個人") {
        // 更新日順ビュー
        supports.sortByLastupdate();
    } else if (target == "事業者") {
        // 標準ビュー
        supports.sortByNumber();
    }
    getSupportsSource(supports);
    $("#result-list").html(s);
    $("#count-result").html(count);
    $("#count-all").html(supports.items.length);

    // sticky
    /*
    if ($("#form-sticky").length > 0) {
        UIkit.sticky("#form-sticky", {
            offset: 100,
            bottom: true
        });
    }
    */
}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createSearchHeader);
themeInitializers.push(createSearchResult);
