
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// お知らせの作成
function createInfoListView() {
    if ($("#info").length == 1) {

        // もし id="info" の要素があれば、お知らせを作成
        if (feeds.items.length > 1) {
            var s = '';
            for (var i = 0; i < feeds.items.length; i++) {
                
                // sectionが「お知らせ」で始まる場合
                if (String(feeds.items[i].section).indexOf(tm.const.info.title) == 0) {

                    // 各要素に適用する値の取得
                    var _body = feeds.items[i].body;
                    var _url = feeds.items[i].url;
                    var _date = feeds.items[i].date;
                    var _description = tm.const.info.title + "「" + _body + "」の詳細";
                    var _category = "";
                    if (feeds.items[i].id > 0) {
                    
                        // supportsを検索して適用
                        var _support = supports.find(feeds.items[i].id);
                        if (_support) {

                            // url
                            _url = "support.html?page=" + _support.id;
                            
                            // category
                            if (_support.category.kojin[0] != "") {
                                _category += '<span class="kojin"><span>' + _support.category.kojin.join('</span><span>') + '</span></span>';
                            }
                            if (_support.category.jigyousha[0] != "") {
                                _category += '<span class="jigyousha"><span>' + _support.category.jigyousha.join('</span><span>') + '</span></span>';
                            }
                            if (_category != "") {
                                _category = '<p class="uk-text-meta tag">' + _category + '</p>';    
                            }
                        }
                    }
                    
                    // ソースの作成
                    var _class = "";
                    if (_url != "") {_class = " uk-card-hover";}
                    if (s == "") {
                        s += 
                        '<div class="uk-container uk-container-large uk-padding-large">' +
                            '<h3 class="uk-margin">お知らせ</h3>' +
                            '<div class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@xl" uk-grid>';
                    }
                    s +=        '<div>';
                    s +=            '<div class="uk-card uk-card-default' + _class + '">';
                    if (_url != "") {
                        s +=            '<a href="' + _url + '" title="' + _description + '">';
                    }
                    s +=                    '<div class="uk-card-body uk-height-1-1">';
                    s +=                        '<div class="uk-height-1-1">';
                    s +=                            '<p class="tm-feed-body">' + _body + '</p>';
                    s +=                            _category;
                    s +=                            '<span class="uk-text-meta tm-feed-date">' + dateFormat.format(_date, "yyyy.MM.dd") + '</span>';
                    if (_url != "") {s +=           '<span class="uk-button uk-button-primary tm-feed-button">詳細</span>';}
                    s +=                        '</div>';
                    s +=                    '</div>';
                    if (_url != "") {
                        s +=            '</a>';
                    }
                    s +=            '</div>';
                    s +=        '</div>';
                }
            }
            if (s != "") {
                s +=        '</div>';
                s +=    '</div>';    
                $("#info").html(s);
            }
        }
    }
}

// ピックアップの作成
function createPickupListView() {

    for (var j = 0; j < targets.items.length; j++) {
        var _target = targets.items[j];
        var _selector = "#pickup-" + tm.const.target[_target];
        if ($(_selector).length == 1) {

            // もし id="pickup-[target]" の要素があれば、ピックアップを作成
            if (feeds.items.length > 1) {
                var s = '';
                for (var i = 0; i < feeds.items.length; i++) {
                    
                    if (String(feeds.items[i].section).indexOf(_target) != 0) {continue;}
                    if (feeds.items[i].id < 0) {continue;}
                    var _support = supports.find(feeds.items[i].id);
                    if (!_support) {continue;}

                    // category
                    var _category = "";
                    if (_support.category.kojin[0] != "") {
                        _category += '<span class="kojin"><span>' + _support.category.kojin.join('</span><span>') + '</span></span>';
                    }
                    if (_support.category.jigyousha[0] != "") {
                        _category += '<span class="jigyousha"><span>' + _support.category.jigyousha.join('</span><span>') + '</span></span>';
                    }
                    if (_category != "") {
                        _category = '<p class="uk-text-meta tag">' + _category + '</p>';    
                    }
                    
                    // ソースの作成
                    var _description = "ピックアップ情報「" + _support.title + "」の詳細";
                    if (s == "") {
                        s += 
                        '<div class="uk-container uk-container-large uk-padding-large">' +
                            '<h3 class="uk-margin">ピックアップ情報</h3>' +
                            '<div class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@xl" uk-grid>';
                    }
                    s +=        '<div>';
                    s +=            '<div class="uk-card uk-card-default uk-card-hover">';
                    s +=                '<a href="support.html?page=' + _support.id + '&target=' + encodeURI(_target) + '" title="' + _description + '">';
                    s +=                    '<div class="uk-card-body uk-height-1-1">';
                    s +=                        '<div class="uk-height-1-1">';
                    s +=                            '<h4>' + _support.title + '</h4>';
                    s +=                            '<p class="tm-feed-body">' + _support.about + '</p>';
                    s +=                            _category;
                    s +=                            '<span class="uk-text-meta tm-feed-date">' + dateFormat.format(_support.date.lastupdate, "yyyy.MM.dd") + '</span>';
                    s +=                            '<span class="uk-button uk-button-primary tm-feed-button">詳細</span>';
                    s +=                        '</div>';
                    s +=                    '</div>';
                    s +=                '</a>';
                    s +=            '</div>';
                    s +=        '</div>';
                }
                if (s != "") {
                    s +=    '</div>';
                    s +='</div>';    
                    $(_selector).html(s);
                }
            }
        }
    }
}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createInfoListView);
themeInitializers.push(createPickupListView);
