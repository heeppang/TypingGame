// mouse effect

const MESSAGE = "놀자~~"; // 따라다닐 녀석

let colour = "#fff"; // 색상 랜덤
let r_mode = 4;

let fs = 25;
let sc = 0.8; //자간
let ft = "Hanna"; //서체
let delay = 0.35; // 흔들리는 정도
let speed = 40; // 속도
let hy = 30; // 마우스와 상하거리
let hx = 0; // 마우스와 좌우거리

//검정 그림자 지정
let fcss =
  "text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;";

let msg = MESSAGE.split("");
let len = msg.length;
var y = 0,
  a;
(x = 0),
  (yp = []),
  (xp = []),
  (yd = []),
  (xd = []),
  (temp = []),
  (scy = 0),
  (scx = 0),
  (i = 0);
for (i = 0; i < len; i++) {
  document.write(
    "<span id='letters" +
      i +
      "' style='position:absolute;font-size:" +
      fs +
      "px;font-family:" +
      ft +
      ";" +
      fcss +
      "z-index:100000;'>" +
      msg[i] +
      "</span>"
  );
}
document.onmousemove = function (e) {
  y = e.pageY + hy;
  x = e.pageX + hx;
};
function assign() {
  var h = window.pageYOffset + window.innerHeight - fs - hy - 18;
  for (i = 0; i < len; i++) {
    temp[i].top = Math.min(h, yp[i]) + "px";
    temp[i].left = xp[i] + i * (fs * sc) + "px";
  }
}
function ripple() {
  yp[0] = yd[0] += (y - yd[0]) * delay;
  xp[0] = xd[0] += (x - xd[0]) * delay;
  for (var i = 1; i < len; i++) {
    yp[i] = yd[i] += (yp[i - 1] - yd[i]) * delay;
    xp[i] = xd[i] += (xp[i - 1] - xd[i]) * delay;
  }
  assign();
  setTimeout(ripple, speed);
}
function newColour() {
  /*■문자 지정색 추가*/
  var c = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  if (r_mode === 1) {
    return "rgb(255," + c[0] + "," + c[1] + ")";
  } //빨강색
  else if (r_mode === 2) {
    return "rgb(" + c[0] + ",255," + c[1] + ")";
  } //초록색
  else if (r_mode === 3) {
    return "rgb(" + c[0] + "," + c[1] + ",255)";
  } //파란색
  else if (r_mode === 4) {
    var cc = [];
    cc[0] = 255;
    cc[1] = Math.floor(Math.random() * 256);
    cc[2] = Math.floor(Math.random() * (256 - cc[1] / 2));
    cc.sort(function () {
      return 0.5 - Math.random();
    });
    console.log("rgb(" + cc[0] + "," + cc[1] + "," + cc[2] + ")");
    return "rgb(" + cc[0] + "," + cc[1] + "," + cc[2] + ")";
  } //무지개색
  else if (r_mode === 5) {
    return "rgb(" + c[0] + "," + c[0] + "," + c[0] + ")";
  } //회색
  else if (r_mode === 0) {
    document.getElementById("letters" + i).style.color = colour;
  }
}
function init() {
  for (i = 0; i < len; i++) {
    yp[i] = xp[i] = yd[i] = xd[i] = 0;
    temp[i] = document.getElementById("letters" + i).style;
    temp[i].color = colour == "random" ? newColour() : colour; //■문자색 지정 추가
  }
  ripple();
}
init();
