//グローバル
var supportData = new Array(); //イベントデータ全て格納

//イベントデータクラス
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

//検索結果でタグ表示用　準備
var category = ["すべて","相談等","資金繰り","補助制度・給付金","設備投資、消費喚起等","雇用・従業員","税・社会保険料等","区分7","区分8","区分9","区分10"]
var tag = ""; //ここにタグを足しこんで表示

// csvファイルのキャッシュ無効化用パラメータ作成
var csv_d = new Date();
var csv_q = "?nocache=";
csv_q += String(csv_d.getFullYear());
csv_q += ('0' + String(csv_d.getMonth() + 1)).slice(-2);
csv_q += ('0' + csv_d.getDate()).slice(-2);
csv_q += ('0' + csv_d.getHours()).slice(-2);
csv_q += ('0' + csv_d.getMinutes()).slice(-2);

//描画
function drawResult(){
  //パラメーターの受け取り
  var param = location.search; // アドレスの「?」以降の引数(パラメータ)を取得
  param = param.substring(1); //先頭の?をカット
  var pair = param.split("&"); //&で引数を分割
  var temp = "";
  var key = new Array();
  for (var i=0;i<pair.length;i++){
    temp = pair[i].split("="); //配列を=で分割
    keyName = temp[0];
    keyValue = temp[1];
    //キーと値の連想配列を生成
    key[keyName] = keyValue;
  }
  var word = decodeURIComponent(key["freeword"]);
  //検索条件　対象：分類：検索キーワードを表示
  var header = document.getElementById("keyword");
  if (word != "") {header.innerHTML += "<span>検索キーワード:" + word + "</span>"}
  //検索件数表示の準備
  var count = document.getElementById("count");
  var c = 0;
  var list = document.getElementById("list");
  //csvファイル読み込み
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    var tempArray = xhr.responseText.split("\n"); //正規表現の改行を用いる。内容説明に基データの文章中改行が用いられるため。
    var csvArray = new Array();
    for(var i=1;i<(tempArray.length-1);i++){ //i=1はヘッダーを読み込ませないため。length-1は読み込みオーバー防止
      csvArray[i] = tempArray[i].split(","); //タブの正規表現
      var data = csvArray[i];
      //とりあえず読み込んだすべてのデータをDataクラスの配列に格納
      supportData[i] = new SupportData(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],data[12],data[13],data[14],data[15],data[16],data[17]);
      //判定
          if (word == ""){
            //検索件数
            count.innerHTML = i + "件/" + tempArray.length + "件";
            var item = document.createElement("li");
            item.className = "list";
            // styleはcssで定義
            var link = document.createElement("a");
            link.href = "#";
            link.onclick = (function(num){ return function(){ clickList(num); };})(i);
            //分類該当判定
            for (var j = 8; j < 17; j++){
              if (data[j]!=0){ tag = tag + "<span>" + category[j - 7] + "</span>"; }
            }
            //表示文字足し込み
            link.innerHTML =
              "<h3>" + data[1] + "</h3>" +
              "<p>"  + data[2] + "</p>" +
              "<p class='uk-text-meta tag'>分類 "  + tag + "</p>" + 
              "<p class='uk-text-meta'>更新 <span class='uk-margin-small-left'>" + supportData[i].lastupdate + "</span></p>";
            tag = ""; //クリア
            item.appendChild(link);
            list.appendChild(item);
            c = c + 1; //検索件数
          } else if (tempArray[i].match(word)){
            //検索件数
            count.innerHTML = i + "件/" + tempArray.length + "件";
            var item = document.createElement("li");
            item.className = "list";
            // styleはcssで定義
            var link = document.createElement("a");
            link.href = "#";
            link.onclick = (function(num){ return function(){ clickList(num); };})(i);
            //分類該当判定
            for (var j = 8; j < 17; j++){
              if (data[j]!=0){ tag = tag + "<span>" + category[j - 7] + "</span>"; }
            }
            //表示文字足し込み
            link.innerHTML =
              "<h3>" + data[1] + "</h3>" +
              "<p>"  + data[2] + "</p>" +
              "<p class='uk-text-meta tag'>分類 "  + tag + "</p>" + 
              "<p class='uk-text-meta'>更新 <span class='uk-margin-small-left'>" + supportData[i].lastupdate + "</span></p>";
            tag = ""; //クリア
            item.appendChild(link);
            list.appendChild(item);
            c = c + 1; //検索件数
          };
    };
    //件数表示　tempArray.length-2に注意。ヘッダー分と0スタートをあわせ２を引いて件数とする
    count.innerHTML = String(c) + "<span class='small'>件</span><span class='delimiter'>/</span>" + (tempArray.length-2) + "<span class='small'>件</span>";
  };
  xhr.open("get", "support.csv" + csv_q, true);
  xhr.send(null);
}

function clickList(num){
  var _id = num //リスト何番目がクリックされたか
  var param = "id="+_id;
  location.href = "./support.html?"+param;
}
