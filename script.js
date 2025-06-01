const blessings = `
一切努力，都会开花；

所写所愿，终有回响。

高考加油，圆圆 ( •̀ ω •́ )✧
`;

const flagCode = [
  "ctx.beginPath();",
  "ctx.moveTo(10, 10);",
  "ctx.lineTo(45, 20);",
  "ctx.lineTo(10, 30);",
  "ctx.closePath();",
  "ctx.fillStyle = '#d00000';",
  "ctx.fill();",
  "ctx.strokeStyle = '#333';",
  "ctx.lineWidth = 3;",
  "ctx.beginPath();",
  "ctx.moveTo(10, 10);",
  "ctx.lineTo(10, 50);",
  "ctx.stroke();"
];

// 打字音效
const keySound = new Audio('type.mp3');

function openEnvelope() {
  document.getElementById("bg-music").play();
  document.querySelector(".envelope-container").style.display = "none";
  const letter = document.querySelector(".letter");
  letter.classList.remove("hidden");

  setTimeout(() => {
    typeBlessings(0);
  }, 1000);
}

// 逐字打字 + 音效
function typeBlessings(index) {
  const display = document.getElementById("blessing-text");
  if (index >= blessings.length) {
    setTimeout(() => drawFlagStepByStep('flag-left', false), 500);
    setTimeout(() => drawFlagStepByStep('flag-right', true), 500);
    return;
  }

  const char = blessings[index];
  display.textContent += char;
  if (char !== "\n") {
    keySound.currentTime = 0;
    keySound.play();
  }

  setTimeout(() => typeBlessings(index + 1), 70);
}

// 动态绘旗帜：打出“代码” + 实际绘制
function drawFlagStepByStep(canvasId, mirrored = false) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.clearRect(0, 0, 60, 60);

  // 设置绘图偏移（镜像后仍绘制在同一区域）
  if (mirrored) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  let i = 0;
  function drawNext() {
    if (i >= flagCode.length) {
      ctx.restore();
      if (canvasId === "flag-right") animateFlags(); // 两面都绘完后再开始摆动
      return;
    }
    try {
      eval(flagCode[i]);
    } catch (e) {
      console.error("绘图失败:", e);
    }
    i++;
    setTimeout(drawNext, 100);
  }

  drawNext();
}

// 旗帜左右摇摆
function animateFlags() {
  let angle = 0;
  const left = document.getElementById("flag-left");
  const right = document.getElementById("flag-right");

  setInterval(() => {
    angle = Math.sin(Date.now() / 300) * 8;
    left.style.transform = `rotate(${angle}deg)`;
    right.style.transform = `rotate(${-angle}deg)`;
  }, 30);
}

// 初始化空红旗位置（不预绘图）
document.addEventListener("DOMContentLoaded", () => {
  const ctxL = document.getElementById("flag-left").getContext("2d");
  ctxL.clearRect(0, 0, 60, 60);

  const ctxR = document.getElementById("flag-right").getContext("2d");
  ctxR.clearRect(0, 0, 60, 60);
});
