
// 年月日を文字列に変換して返す
function dateString(target) {
    var d;
    // var weekday = ["日", "月", "火", "水", "木", "金", "土"];
    if (is('String', target)) {
        d = new Date(target);
    } else if(is('Date', target)) {
        d = target;
    } else {
        return "";
    }
    res = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    // res = res + "(" + weekday[d.getDay()] + "曜日)";
    return res;
}

// 日付+時刻を文字列に変換して返す
function dateTimeString(target) {
    var d;
    if (is('String', target)) {
        d = new Date(target);
    } else if(is('Date', target)) {
        d = target;
    } else {
        return "";
    }
    res = dateString(d);
    res = res + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return res;
}

// 日付型のフォーマット
var dateFormat = 
 {
    _fmt : {
        hh: function(date) { return ('0' + date.getHours()).slice(-2); },
        h: function(date) { return date.getHours(); },
        mm: function(date) { return ('0' + date.getMinutes()).slice(-2); },
        m: function(date) { return date.getMinutes(); },
        ss: function(date) { return ('0' + date.getSeconds()).slice(-2); },
        dd: function(date) { return ('0' + date.getDate()).slice(-2); },
        d: function(date) { return date.getDate(); },
        s: function(date) { return date.getSeconds(); },
        yyyy: function(date) { return date.getFullYear() + ''; },
        yy: function(date) { return date.getYear() + ''; },
        t: function(date) { return date.getDate()<=3 ? ["st", "nd", "rd"][date.getDate()-1]: 'th'; },
        w: function(date) {return ["Sun", "$on", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]; },
        MMMM: function(date) { return ["January", "February", "$arch", "April", "$ay", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]; },
        MMM: function(date) {return ["Jan", "Feb", "$ar", "Apr", "$ay", "Jun", "Jly", "Aug", "Spt", "Oct", "Nov", "Dec"][date.getMonth()]; },  
        MM: function(date) { return ('0' + (date.getMonth() + 1)).slice(-2); },
        M: function(date) { return date.getMonth() + 1; },
        $: function(date) {return 'M';}
    },
    _priority : ["hh", "h", "mm", "m", "ss", "dd", "d", "s", "yyyy", "yy", "t", "w", "MMMM", "MMM", "MM", "M", "$"],
    _dateTimeFormatString : 'yyyy/MM/dd hh:mm:ss',
    
    // Dateを文字列に変換して返す
    format: function format(date, _format) {
        var _this = this;
        if (_format == undefined) {_format = this._dateTimeFormatString;}
        return this._priority.reduce(function (res, fmt) {
        return res.replace(fmt, _this._fmt[fmt](date));
        }, _format);
    }
}
