if (window.location.pathname === "/game.html") {
  const num_right = document.getElementById("number__right");
  const num_left = document.getElementById("number__left");
  let answer = document.getElementById("answer");
  const solution = document.getElementById("ans");
  const scoreText = document.getElementById("score");
  const math = document.getElementById("math");
  const progressText = document.getElementById("progressText");
  const progressBarFull = document.getElementById("progressBarFull");
  const bell = document.querySelector("#audio");
  const user = document.querySelector(".user");
  const endGame = document.getElementById("game__end");
  const animation = document.getElementById("score__animation");
  const score_animation = document.querySelector(".hud__item");

  const mindiv = document.querySelector(".mins");
  const secdiv = document.querySelector(".secs");

  const circle = document.querySelector(".progress-ring__circle");

  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
  mins = 1.5;
  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);

  function decremenT() {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    if (circle.classList.contains("danger")) {
      circle.classList.remove("danger");
    }

    if (seconds > 0) {
      perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
      setProgress(perc);
      seconds--;
      initial = window.setTimeout("decremenT()", 1000);
      if (seconds < 10) {
        circle.classList.add("danger");
      }
    } else {
      mins = 0;
      seconds = 0;
      bell.play();
      setTimeout(() => {
        window.location.assign("/endGame.html");
      }, 3000);
    }
  }

  let num1 = Math.floor(Math.random() * 20 + 1);
  let num2 = Math.floor(Math.random() * 20 + 1);

  let scores = 0;
  let questionCounter = 0;

  num_left.value = num1;
  num_right.value = num2;

  let result;
  let wrong = 0;

  const equations = ["+", "-", "/", "*"];

  const SCORE_POINTS = 1;
  const MAX_QUESTIONS = 5;

  function startGame() {
    questionCounter = 0;
    scores = 0;
    getRandomEquation();
  }

  function getRandomEquation() {
    const questionIndex =
      equations[Math.floor(Math.random() * equations.length)];
    questionCounter++;
    progressText.innerText = `Question number ${questionCounter}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    math.innerText = questionIndex;

    if (questionIndex === "+") {
      result = num2 + num1;
    } else if (questionIndex === "-") {
      result = num1 - num2;
    } else if (questionIndex === "/") {
      divideHelper();
      result = num1 / num2;
    } else if (questionIndex === "*") {
      result = num1 * num2;
    }
  }

  function divideHelper() {
    for (let i = 0; i < 200; i++) {
      if (num1 % num2 == 0 && num1 != 0 && num2 != 0) {
        num_left.value = num1;
        num_right.value = num2;
        break;
      }
      num1 = Math.floor(Math.random() * 20 + 1);
      num2 = Math.floor(Math.random() * 20 + 1);
    }
  }

  function check() {
    if (answer.value == result) {
      solution.style.color = "green";
      solution.innerHTML = "Good Job! Correct! Next";
      incrementScore(SCORE_POINTS);
      animation.classList.add("success__score");
    } else {
      solution.style.color = "red";
      solution.innerHTML = `Correct Answer is ${result}! Try the next one!`;
      decrementScore(SCORE_POINTS);
      wrong++;
      animation.classList.add("fail__score");
      score_animation.classList.add("horizontal-shake");
    }

    setTimeout(() => {
      answer.value = "";
      num1 = Math.floor(Math.random() * 20 + 1);
      num2 = Math.floor(Math.random() * 20 + 1);
      num_right.value = num2;
      num_left.value = num1;
      getRandomEquation();
      animation.classList.remove("success__score");
      score_animation.classList.remove("horizontal-shake");
      animation.classList.remove("fail__score");
    }, 1000);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") check();
  });

  const incrementScore = (num) => {
    scores += num;
    scoreText.innerText = scores;
  };

  const decrementScore = (num) => {
    scores -= num;
    if (scores < 0) {
      scores = 0;
    }
    scoreText.innerText = scores;
  };
  startGame();

  const attackScores = JSON.parse(localStorage.getItem("attackScores")) || [];
  const username = JSON.parse(localStorage.getItem("usernames"));
  user.innerText = username;

  endGame.addEventListener("click", (e) => {
    e.preventDefault();
    const score = {
      name: username,
      score: scores,
      correct: scores,
      incorrect: wrong,
    };

    if (attackScores.length === 0) {
      attackScores.push(score);
    }

    const exactUser = attackScores.some((item) => item.name === username);
    if (!exactUser) {
      attackScores.push(score);
    }

    if (attackScores.length > 0) {
      attackScores.map((item) => {
        if (item.name === username && item.score < scores) {
          console.log("same");
          item.score = scores;
          item.correct = scores;
          item.incorrect = wrong;
        }
      });
    }

    attackScores.sort((a, b) => b.score - a.score);
    attackScores.splice(5);

    localStorage.setItem("attackScores", JSON.stringify(attackScores));
    window.location.assign("/endGame.html");
  });
}
