
function clickButton(num){
  var num = encodeURIComponent(num);
  var param = "num=" + num;
  location.href="./result2.html?" + param;
  //後のページで復帰するためlocalStorageに保存
  localStorage.setItem('result' , "./result2.html?" + param);
}
