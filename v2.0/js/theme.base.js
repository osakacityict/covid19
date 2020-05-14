
// need: csv.js
/* use:
    tm.initialize(function(){
        初期化処理        
    });
*/

// テーマ初期化時に実行する関数群
// theme.[各コンポーネント].js において追加登録される
var themeInitializers = [];

// テーマ初期化用オブジェクト
function Theme() {

    // csvファイルからデータベースを作成する
    // 引数はcsvファイル名（.csvは不要）の配列を指定すること
    // 実際のダウンロードは initialize() 時に行われる
    this.db = new CsvDatabase(["feed", "category", "support"]);

};
Theme.prototype = {

    // 定数
    const: {
        info: {
            title: "お知らせ"
        },
        category: {
            all: "すべて"
        },
        target: {
            kojin: "個人",
            jigyousha: "事業者",
            個人: "kojin",
            事業者: "jigyousha",
            suffix: "の方へ"
        },
        loader: {
            id: "loader",
            selector: "#loader"
        },
        sharepoint: {
            delimiter: ";#"
        }
    },

    // 初期化
    initialize: function(callback) {
        var _this = this;
        this.db.download(function(){

            // データベースから各一覧を作成
            feeds.create(_this.db.tables.feed);
            targets.create(_this.db.tables.category);
            categories.create(_this.db.tables.category);
            supports.create(_this.db.tables.support);

            // themeInitializers に事前登録された、各コンポーネントの関数群を実行
            while (themeInitializers.length > 0){
                themeInitializers.shift()();
            }
            
            // コールバック関数の実行
            if (callback) {callback();}
            
            // 画面を表示
            if ($(_this.const.loader.selector).length > 0) {
                UIkit.modal(_this.const.loader.selector).hide();
            }
        });
    }
}
var tm = new Theme;

// データベースからフィード（お知らせ、ピックアップ）一覧を作成して保存するためのオブジェクト
// theme.[各コンポーネント].js における処理において参照される
var feeds = {
    items: [],
    create: function(_csv) {
        this.clear();
        for (var i = 1; i < _csv.length(); i++) {
            this.add([
                _csv.text(i, 0), 
                _csv.text(i, 1), 
                _csv.text(i, 2),
                _csv.text(i, 3),
                _csv.text(i, 4)
            ]);
        }
    },
    add: function(row) {
        try {
            // add
            if (row[1] == "") {row[1] = -1;}
            this.items.push({
                section: row[0],
                id: parseInt(row[1]),
                body: row[2],
                url: row[3],
                date: new Date(row[4])
            });
            return true;
        } catch(e) {
            // console.log(e);
            return false;
        }
    },
    clear: function() {
        this.items = [];
    }
};

// データベースから対象者区分一覧（個人、事業者、...）を作成して保存するためのオブジェクト
// theme.[各コンポーネント].js における処理において参照される
var targets = {
    items: [],
    create: function(_csv) {
        this.clear();
        for (var i = 1; i < _csv.length(); i++) {
            this.add(_csv.text(i, 0));
        }
    },
    add: function(name) {
        try {
            if (this.items.length == 0) {
                // add
                this.items.push(name);
                return true;
            } else {
                // 重複排除
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i] == name) {
                        return true;
                    }
                }
                // add
                this.items.push(name);
                return true;
            }
        } catch(e) {
            // console.log(e);
            return false;
        }
    },
    clear: function() {
        this.items = [];
        return false;
    }
};

// データベースから分類一覧を作成して保存するためのオブジェクト
// theme.[各コンポーネント].js における処理において参照される
var categories = {
    items: [],
    create: function(_csv) {
        this.clear();
        for (var i = 1; i < _csv.length(); i++) {
            this.add([
                _csv.text(i, 0), 
                _csv.text(i, 1), 
                _csv.text(i, 2)
            ]);
        }
    },
    add: function(row) {
        try {
            // add
            this.items.push({
                target: row[0],
                name: row[1],
                icon: row[2]
            });
            return true;
        } catch(e) {
            // console.log(e);
            return false;
        }
    },
    clear: function() {
        this.items = [];
    }
};

// データベースから支援制度一覧を作成して保存するためのオブジェクト
// theme.[各コンポーネント].js における処理において参照される
var supports = {
    items: [],
    create: function(_csv) {
        this.clear();
        for (var i = 1; i < _csv.length(); i++) {
            this.add([
                _csv.text(i, 0),
                _csv.html(i, 1),
                _csv.html(i, 2),
                _csv.html(i, 3),
                _csv.text(i, 4),
                _csv.text(i, 5),
                _csv.text(i, 6),
                _csv.text(i, 7),
                _csv.text(i, 8),
                _csv.text(i, 9),
                _csv.text(i, 10),
                _csv.text(i, 11)
            ]);
        }
    },
    add: function(row) {
        try {
            // add
            this.items.push({
                id: parseInt(row[0]),
                number: this.items.length,
                title: row[1],
                about: row[2],
                body: {
                    text: row[3],
                    url: row[4]
                },
                inquiry: {
                    text: row[5],
                    url: row[6]
                },
                category: {
                    kojin: String(row[7]).split(tm.const.sharepoint.delimiter),
                    jigyousha: String(row[8]).split(tm.const.sharepoint.delimiter)
                },
                keywords: String(row[9]).split(tm.const.sharepoint.delimiter),
                date: {
                    lastupdate: new Date(row[10]),
                    created: new Date(row[11])
                }
            });
            return true;
        } catch(e) {
            // console.log(e);
            return false;
        }
    },
    find: function(id) {
        var res;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                res = this.items[i];
                break;
            }
        }
        return res;
    },
    sortByNumber: function() {
        function _compare(a, b){
            var r = 0;
            if( a.number > b.number ){ r = -1; }
            else if( a.number < b.number ){ r = 1; }
            return (r * -1);
        }
        this.items.sort(_compare);
    },
    sortByLastupdate: function() {
        function _compare(a, b){
            var r = 0;
            if( a.date.lastupdate < b.date.lastupdate ){ r = -1; }
            else if( a.date.lastupdate > b.date.lastupdate ){ r = 1; }
            return (r * -1);
        }
        this.items.sort(_compare);
    },
    sortByCreated: function() {
        function _compare(a, b){
            var r = 0;
            if( a.date.created < b.date.created ){ r = -1; }
            else if( a.date.created > b.date.created ){ r = 1; }
            return (r * -1);
        }
        this.items.sort(_compare);
    },
    clear: function() {
        this.items = [];
    }
};
