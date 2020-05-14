
// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

// 支援情報詳細画面の作成
function createSupportView() {
    
    var id = url.getParam("page");
    var target = url.getParam("target");
    var category = url.getParam("category");

    for (var i = 0; i < supports.items.length; i++) {
        if (supports.items[i].id == id) {

            var support = supports.items[i];

            var categories = "";
            for (var j = 0; j < support.category.kojin.length; j++) {
                if (support.category.kojin[j] != "") {
                    categories += '<a href="search.html?target=' + encodeURI("個人") + '&category=' + encodeURI(support.category.kojin[j]) + '" class="kojin">' + support.category.kojin[j] + '</a>';
                }
            }
            for (var j = 0; j < support.category.jigyousha.length; j++) {
                if (support.category.jigyousha[j] != "") {
                    categories += '<a href="search.html?target=' + encodeURI("事業者") + '&category=' + encodeURI(support.category.jigyousha[j]) + '" class="jigyousha">' + support.category.jigyousha[j] + '</a>';
                }
            }

            var contents_body = '<p class="uk-margin-remove-bottom">' + support.body.text + '</p>';
            if (support.body.url != "") {
                contents_body += '<a href="' + support.body.url + '" target="_blank" class="uk-button uk-button-primary uk-button-large"><span class="uk-margin-right">詳細ページへ</span><span uk-icon="icon: arrow-right; ratio: 1.5;"></span></a>';
                // set share
                $(".tm-contents-share .twitter").attr("href", "https://twitter.com/share?text=" + encodeURI(String(support.title).replace(/&nbsp;/g, ' ')) + "&url=" + encodeURI(support.body.url));
                $(".tm-contents-share .line").attr("href", "http://line.me/R/msg/text/?" + encodeURI(String(support.title).replace(/&nbsp;/g, ' ')) + " " + encodeURI(support.body.url));
                $(".tm-contents-share .facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(support.body.url));
            } else {
                // remove share
                $(".tm-contents-share").remove();
            }

            var contents_inquiry = '<a href="' + support.inquiry.url + '" target="_blank">' + support.inquiry.text + '</a>';

            $("#contents-title").html(support.title);
            $("#contents-categories").html(categories);
            $("#contents-about").html(support.about);
            $("#contents-body").html(contents_body);
            $("#contents-inquiry").html(contents_inquiry);
            $("#contents-lastupdate").html(dateFormat.format(support.date.lastupdate, "yyyy年MM月dd日"));
            $("#contents-created").html(dateFormat.format(support.date.created, "yyyy年MM月dd日"));
            $("#contents-id").html(support.id);

            return false;
        }
    }
}

// テーマ初期化時に実行する関数群へ登録
themeInitializers.push(createSupportView);
