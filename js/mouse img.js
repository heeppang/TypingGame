// mouse effect

var mga = "img/달리는빵빵덕.gif"; //★이미지 주소 지정
var hx = 10; //★표시위치와 좌표 지정 (마이너스치로 좌측)
var hy = 20; //★표시위치 y좌표  (마이너스치로 위쪽)
var spd = 5; //★마우스와 이미지 속도 (작을 수록 빠름)
var st = 20; //★마우스와 이미지가 따라 붙을 때 이미지 변화 속도(작을 수록 변화가 적음,떨어지지 않음)
//----------------------------------------------------------------------------------------------
var ix = 0,
  iy = 0,
  mx = -200,
  my = -200;
document.write("<img src=" + mga + " id='Mo' style='position:absolute; width:70px; height:70px; \
z-index:10000; border-radius:50px; \
box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FFCCFF, 0 0 30px #FFCCFF, 0 0 40px #FFCCFF, 0 0 55px #FFCCFF, 0 0 75px #FFCCFF;'>");
document.onmousemove = function (e) {
  mx = e.pageX + hx;
  my = e.pageY + hy;
};
function Run() {
  var w = window.innerWidth - Mo.offsetWidth - 18;
  var h = window.pageYOffset + window.innerHeight - Mo.offsetHeight - 18;
  var ob = document.getElementById("Mo").style;
  ix += (mx - ix) / st;
  iy += (my - iy) / st;
  ob.left = Math.min(w, ix) + "px";
  ob.top = Math.min(h, iy) + "px";
  setTimeout(Run, spd);
}
Run();
