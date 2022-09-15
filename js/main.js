//  사용변수
const GAME_TIME = 8; // 상수
const GAME_OVER = "🐥Game Over🐤";
const GAME_START = "Game Start!🐥";
const GAME_PLAYING = "두구두구둥 \n빵빵덕과 대결 중!";
const HURRY = "빨리 빨리 하라구~~";
const REPEAT = "어디 한판 더 <span class='repeat'>?</span>";
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const header = document.querySelector(".header h1");
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".typing");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-area");
const ppangduck1 = document.querySelector(".ppangppangduck1");
const ppangduck2 = document.querySelector(".ppangppangduck2");
const hurryUp = document.querySelector("#hurry");
const watching = document.querySelector("#watching");
const resultImg = document.querySelector("#ppangduckimg");
const scoreModal = document.querySelector("#score-alert");

init();

function init() {
  modalOff();
  time = 0;
  buttonChange1("loading...🐣");
  getWords();
  wordInput.addEventListener("input", checkMatch);
  document.querySelector("#hurry").innerText = HURRY;
}

function run() {
  document.querySelector("#jsfirework").style.visibility = "hidden";
  ppangduck1.style.visibility = "hidden";
  hurryUp.style.visibility = "hidden";
  ppangduck2.classList.remove("slide");
  score = 0;
  button.style.zIndex = -1;

  if (isPlaying) {
    //false
    return;
  }

  wordDisplay.style.fontFamily = "Elephant";
  wordDisplay.style.fontSize = "70px";
  wordDisplay.style.color = "#50054a";
  shuffle(words);
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  wordInput.value = "";
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange1(GAME_PLAYING);

  function countDown() {
    watching.classList.add("pSlide");
    ppangduck2.classList.add("slide");
    if (time > 0 && time <= 4 && isPlaying) {
      timeDisplay.style.color = "red";
      timeDisplay.style.fontWeight = "bold";
      ppangduck1.style.visibility = "visible";
      hurryUp.style.visibility = "visible";
      hurryUp.classList.add("hurryUp");
      ppangduck1.classList.add("move");
    } else {
      timeDisplay.style.color = "black";
      timeDisplay.style.fontWeight = "normal";
      ppangduck1.classList.remove("move");
      hurryUp.classList.remove("hurryUp");
    }

    // 삼항연산자
    time > 0 ? time-- : (isPlaying = false); // 남은 시간이 0초 미만일 경우엔 게임 종료
    if (!isPlaying) {
      clearInterval(timeInterval); // 플레이 아닐 시 시간 지우기
      modalOn();
      scoreDisplay.innerText = 0;
    }
    timeDisplay.innerText = time; //남은 시간 표기
  }

  window.addEventListener("keyup", (e) => {
    if (isModalOn() && e.key === "Escape") {
      modalOff();
      buttonChange2(REPEAT);
      document.querySelector("#hurry").innerText = "빨리 다시 하라구~";
    }
  });

  closeBtn.addEventListener("click", (e) => {
    modalOff();
    buttonChange2(REPEAT);
    document.querySelector("#hurry").innerText = "빨리 다시 하라구~";
  });
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange1(GAME_START);
    clearInterval(checkInterval);
  }
}

// 단어 불러오기
function getWords() {
  // Make a request for a user with a given ID
  axios
    .get("https://random-word-api.herokuapp.com/word?number=1000")
    .then(function (response) {
      // handle success
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      });
      buttonChange1(GAME_START);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// 단어가 일치하는 지 체크
function checkMatch() {
  if (wordInput.value === wordDisplay.innerText) {
    wordInput.value = ""; // 초기화
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    shuffle(words);

    if (score === 10) {
      scoreModalOn();
      setTimeout(scoreModalOff,4000);
    } else if (score > 10) {
      time = 6;
    }
    else time = GAME_TIME;
  }
}

function buttonChange1(text) {
  button.innerText = text;
  text === GAME_START
    ? button.classList.remove("loading") // game 시작일 시에는 loading 삭제
    : button.classList.add("loading"); // game 시작이 아닐 시에는 loading 유지
}

function buttonChange2(text) {
  button.innerHTML = text;
}

function shuffle(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  wordDisplay.innerText = arr[randomIndex];
}

function modalOn() {
  modal.style.display = "flex";
  let modalMessage = "";
  resultImg.src = "";
  document.querySelector(".content").innerHTML =
    "<p><span class='over'>🐥 Game Over 🐤</span><br />당신의 점수는 <span class='over delay'>" +
    score +
    "</span> 점 입니다!!</p>";

  let gameOver = document.querySelector(".content>p>span.over");
  spanText(gameOver);

  sadImgList = ["img/슬프덕.png", "img/우쒸.png"];
  goodImgList = ["img/멋짐폭발.png", "img/영타에입덕.png"];
  niceImgList = ["img/나만의길을간덕.png", "img/심쿵.png"];

  if (score < 5) {
    modalMessage = "<p>영타 연습 좀 하셔야겠어요...</p>";
    resultImg.src = sadImgList[Math.floor(Math.random() * sadImgList.length)];
  } else if (score >= 5 && score < 15) {
    modalMessage = "<p>오 좀 치시는데요?</p>";
    resultImg.src = goodImgList[Math.floor(Math.random() * goodImgList.length)];
  } else if (score >= 15) {
    modalMessage = "<p>당신은 영타의 신!</p>";
    resultImg.src = niceImgList[Math.floor(Math.random() * niceImgList.length)];
    document.querySelector("#jsfirework").style.visibility = "visible";
  }
  document.querySelector(".content").innerHTML += modalMessage;
}

closeBtn.addEventListener("click", (e) => {
  modalOff();
});

function isModalOn() {
  return modal.style.display === "flex";
}

function modalOff() {
  modal.style.display = "none";
  button.style.zIndex = 9999;
}

function scoreModalOn(){
  scoreModal.style.visibility = 'visible';
  document.querySelector('.alert').classList.add('score-moving');
  scoreModal.classList.add('score-fadeout');
  time = 9;
  console.log('scoreModalOn');
}

function scoreModalOff(){
  scoreModal.style.display = "none";
  time = 6;
  console.log('scoreModalOff');
}

// modal 속 텍스트에 다 span 먹이기
function spanText(text) {
  var string = text.innerText;
  console.log(string);
  var spaned = "";
  for (var i = 0; i < string.length; i++) {
    if (string.substring(i, i + 1) === " ") {
      spaned += string.substring(i, i + 1);
    } else spaned += "<span>" + string.substring(i, i + 1) + "</span>";
  }
  text.innerHTML = spaned;
}

// // 순서 제어 망함
// function droplevel(text) {
//   for (var i = 0; i < text.length; i++) {
//     let child = document.querySelector(
//       text + ":nth-child(" + parseInt(i + 1) + ")"
//     );
//     child.style.animationDelay = parseInt(i * 0.2) + "s";
//   }
// }
