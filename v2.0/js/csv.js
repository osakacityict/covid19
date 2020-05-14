
// need: jquery.csv.js, datetime.js

// use: var db = new CsvDatabase(["csvfilename1", "csvfilename2", "csvfilename3", ...]);
function CsvDatabase(csvFileNamesArray) {
    this.tables = {};
    this.tableNames = [];
    for (var i = 0; i < csvFileNamesArray.length; i++) {
        var tableName = csvFileNamesArray[i];
        this.tables[tableName] = new Csv(true, "csv/" + tableName + ".csv");
        this.tableNames[i] = tableName;
    }
}
CsvDatabase.prototype = {
    download: function(succeed, failed) {
        var _this = this;
        var requests = [];
        for (var _table in _this.tables) {
            requests.push(_this.tables[_table].download());
        }
        $.when.apply($, requests)
        .done(function() {
            for (var _table in _this.tables) {
                var _tableIndex = _this.tableNames.indexOf(_table);
                _this.tables[_table].data(arguments[_tableIndex][0]);
            }
            if (succeed) {succeed(arguments);}
        })
        .fail(function(err) {
            if (failed) {failed(err);}
        });
    }
};

// use: var csv = new Csv(is_nocache, "csvfilename.csv");
function Csv(is_nocache, name) {
    // version
    if (is_nocache) {
        this.version = "?version=" + dateFormat.format(new Date(), "yyyyMMddhhmm");
    } else {
        this.version = "";
    }
    // name
    this.name = name + this.version;
    // data
    this._data = null;
}
Csv.prototype = {
    name: function() {return this.name;},
    data: function(data) {
        if (data) {
            this._data = $.csv.toArrays(data);
            return false;
            // readCsvData();
        } else {
            return this._data;
        }
    },
    text: function(row, col) {
        try {
            function csv_cleansing_string(s) {
                s = String(s);
                s = s.replace(/\n/g, '');
                s = s.replace(/'/g, '');
                s = s.replace(/"/g, '');
                s = s.replace(/</g, '');
                s = s.replace(/>/g, '');
                s = s.replace(/：/g, ':');
                s = s.replace(/　/g, ' ');
                s = s.replace(/（/g, '(');
                s = s.replace(/）/g, ')');
                s = s.replace(/－/g, '-');
                s = s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 65248);});
                return s;
            }
            return csv_cleansing_string(this.data()[row][col]);
        } catch(e) {
            console.log(e);
            return null;
        }
    },
    html: function(row, col) {
        try {
            function csv_cleansing_string(s) {
                s = String(s);
                s = s.replace(/\n/g, '');
                s = s.replace(/：/g, ':');
                s = s.replace(/　/g, ' ');
                s = s.replace(/（/g, '(');
                s = s.replace(/）/g, ')');
                s = s.replace(/－/g, '-');
                s = s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 65248);});
                return s;
            }
            return csv_cleansing_string(this.data()[row][col]);
        } catch(e) {
            console.log(e);
            return null;
        }
    },
    length: function() {
        var res;
        if (this.data()) {
            res = this.data().length;
        } else {
            res = -1;
        }
        return res;
    },
    download: function(callback, async) {
        var _this = this;
        if (async == null) {async = true;}
        if (callback) {
            if (!_this.data()) {
                $.ajax({
                    type: 'GET',
                    url: _this.name,
                    async: async
                })
                .done(function(data, status) { 
                    // success
                    _this.data(data);
                    callback();
                })
                .fail(function(status, status_text, description){
                    // fail
                })
                .always(function() {
                    // always
                });
            }    
        } else {
            return $.ajax({
                type: 'GET',
                url: _this.name,
                async: async
            });
        }
    }
}
