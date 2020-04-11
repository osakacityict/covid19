
function clickSearch(){
  var word = encodeURIComponent(document.getElementById("freeword").value);
  var param = "freeword=" + word;
  location.href="./result.html?" + param;
  //後のページで復帰するためにlocalStorageに保存
  localStorage.setItem('result' , "./result.html?" + param);
}
