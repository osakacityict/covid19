//グローバル
var supportData = new Array(); //csvから読み込んだ支援精度データを全て格納用
var id; //id

//サポートデータクラス
function SupportData(_id, _name, _summary, _content, _contact, _url, _target, _lastupdate, _one, _two, _three, _four, _five, _six, _seven, _eight, _nine, _ten){
  this.id = _id;
  this.name = _name;
  this.summary = _summary;
  this.content = _content;
  this.contact = _contact;
  this.url = _url;
  this.target = _target;
  this.lastupdate = _lastupdate;
  this.one = _one;
  this.two = _two;
  this.three = _three;
  this.four = _four;
  this.five = _five;
  this.six = _six;
  this.seven = _seven;
  this.eight = _eight;
  this.nine = _nine;
  this.ten = _ten;
}

// csvファイルのキャッシュ無効化用パラメータ作成
var csv_d = new Date();
var csv_q = "?nocache=";
csv_q += String(csv_d.getFullYear());
csv_q += ('0' + String(csv_d.getMonth() + 1)).slice(-2);
csv_q += ('0' + csv_d.getDate()).slice(-2);
csv_q += ('0' + csv_d.getHours()).slice(-2);
csv_q += ('0' + csv_d.getMinutes()).slice(-2);

//イベント詳細描画
function drawEvent(){
  //イベントidのパラメーターの受け取り
  var param = location.search; // アドレスの「?」以降の引数(パラメータ)を取得
  param = param.substring(1); //先頭の?をカット
  var temp = "";
  temp = param.split("="); //id=_idを=で分割
  id = decodeURIComponent(temp[1]);
  //イベント一覧のcsvファイル読み込み
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    var tempArray = xhr.responseText.split("\n");
    var csvArray = new Array();
    for(var i=1;i<tempArray.length;i++){ //i=1はヘッダーを読み込ませないため
      csvArray[i] = tempArray[i].split(",");
      var data = csvArray[i];
      //とりあえず読み込んだすべてのデータをSupportDataクラスの配列に格納
      supportData[i] = new SupportData(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],data[12],data[13],data[14],data[15],data[16],data[17]);
      //該当idのデータを表示
      if (i == id){
        document.getElementById("keyword").innerHTML = supportData[id].name;
        document.getElementById("description").innerHTML = supportData[id].summary;
        document.getElementById("content").innerHTML = supportData[id].content;
        document.getElementById("lastupdate").innerHTML = supportData[id].lastupdate;
        if (supportData[i].url != "") {
          document.getElementById("contact").innerHTML = "<a href='" + supportData[i].url + "' target='_blank'>" + supportData[id].contact +"</a>";
          document.getElementById("url").innerHTML ="<a href='" + supportData[i].url + "' target='_blank' class='uk-button uk-button-primary uk-button-large right-arrow'>詳細ページへ</a>";
          document.getElementById("sns").innerHTML = getSnsSource();
        } else {
          document.getElementById("contact").innerHTML = supportData[id].contact;
        }
      };
    };
  };
  xhr.open("get", "support.csv" + csv_q, true); // 2020-4-6 csv_q 追加
  xhr.send(null);
}

function postTwitter(){
  //Twitter
  var text = "【新型コロナウイルス感染症対策支援情報サイト | サンプル市】" + String(supportData[id].name).replace(/&nbsp;/g, ' ') + "【URL】"
  location.href = "https://twitter.com/share?text=" + encodeURIComponent(text) + "&url=" + supportData[id].url;
}

function postLine(){
  //LINE
  var text = "【新型コロナウイルス感染症対策支援情報サイト | サンプル市】" + String(supportData[id].name).replace(/&nbsp;/g, ' ') + "【URL】"
  location.href = "http://line.me/R/msg/text/?" + encodeURIComponent(text) + " " + supportData[id].url;
}

function postFacebook(){
  //Facebook
  location.href= "https://www.facebook.com/sharer/sharer.php?u=" + supportData[id].url;
}

function clickButton(){
  //前に保存しておいた検索条件のパラメータをlocalStorageから取得
  var param = localStorage.getItem('result');
  if (param) {
    location.href = param;
  } else {
    location.href = "home.html";
  }

}

function getSnsSource() {
  var s =
    '<!--Twitter-->' +
    '<a href="#" onclick="postTwitter()" class="twitter">' +
      '<img src="png/twitter.png?version=0.0.1" width="40" height="40" alt="Twitterで送る" />' +
    '</a>' +
    '<!--LINE-->' +
    '<a href="#" onclick="postLine()" class="line">' +
      '<img src="png/line.png?version=0.0.1" width="40" height="40" alt="LINEで送る" />' +
    '</a>' +
    '<!--facebook-->' +
    '<a href="#" onclick="postFacebook()" class="facebook">' +
      '<img src="png/facebook.png?version=0.0.1" width="40" height="40" alt="facebookで送る" />' +
    '</a>';
  return s;
}
