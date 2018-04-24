function randomNumber() {
  return Math.floor(Math.random() * 256); // RGB가 0부터 255까지 값을 가지고 있으므로 이렇게 코드 작성
}

function randomColorCode() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`; // rgb()안의 값을 랜덤으로 추출하여 반환하는 함수 작성
}

const colorCodeEl = document.querySelector(".color-code"); // 문제를 내는 div를 colorCodeEl 변수의 값으로 할당
const boxes = document.querySelectorAll(".box"); // boxes에 만든 사각형 박스를 값으로 할당

let correctAnswer; // 변수를 함수 안에서도 밖에서도 사용할 수 있도록 const 대신에 let을 사용
let score = 0; //  점수 초기값 설정

document.querySelector(".score").textContent = score; // 점수 표시판

function newStage() {
  // 새로운 판을 실행시키기 위해서 함수로 정의해놓기
  const colorCodes = [randomColorCode(), randomColorCode(), randomColorCode()]; // colorCodes에 배열 형식으로 요소마다 rgb값을 랜덤 생성한 것을 값으로 할당
  boxes.forEach((el, index) => {
    // forEach로 boxes에 요소마다 인덱스에 맞게 rgb값을 전달
    el.style.backgroundColor = colorCodes[index];
  });

  correctAnswer = Math.floor(Math.random() * 3); // 정답은 0~2까지 나오도록 한다. (인덱스와 일치하게)
  colorCodeEl.textContent = colorCodes[correctAnswer]; // correctAnswer의 값을 colorCodes안에 넣어 인덱스처럼 쓰고 그 해당 값을 colorCodeEl의 텍스트 노드로 전달
}

boxes.forEach((el, index) => {
  //  forEach구문으로 boxes 순회
  el.addEventListener("click", () => {
    //  el(즉, box)를 클릭할때
    if (correctAnswer === index) {
      //  정답이 맞으면(correctAnswer와 index가 일치하면)
      alert("맞았습니다!"); // 정답입니다.
      document.querySelector(".modal.right").classList.add("show");
      score++; // 정답이라면 1점씩 추가
    } else {
      //  아니면
      alert("틀렸습니다!"); // 오답입니다.
      score = 0; // 오답이라면 정답 0점으로 다시 초기화
    }
    document.querySelector(".score").textContent = score; // 맞추던 틀리던 alert하고 나서 점수를 반영하도록 함
    newStage(); // 틀리든지 맞던지 새로운 판 시작!
  });
});

document.querySelector(".modal.right .close").addEventListener("click", () => {
  document.querySelector(".modal.right").classList.remove("show");
});

newStage(); // 초기의 게임 실행을 위해서 함수 호출!
