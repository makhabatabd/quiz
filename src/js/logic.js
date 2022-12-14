if (
  window.location.pathname.endsWith("/game.html") ||
  window.location.pathname.endsWith("/practice.html")
) {
  const num_right = document.getElementById("number_right");
  const num_left = document.getElementById("number_left");
  let answer = document.getElementById("answer");
  const solution = document.getElementById("ans");
  const scoreText = document.getElementById("score");
  const math = document.getElementById("math");
  const progressText = document.getElementById("progressText");
  const progressBarFull = document.getElementById("progressBarFull");
  const user = document.querySelector(".user");
  const animation = document.getElementById("score-animation");
  const score_animation = document.querySelector(".hud__item");
  let modal__outter = document.querySelector(".modal__outter");
  const restart = document.getElementById("continue");
  const menuEnd = document.getElementById("menu-end-game");
  let isPause = false;
  let scores = 0;

  let result;
  let wrong = 0;
  let correct = 0;
  let counter = 0;
  let levelCounter;

  let num1 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  let num2 = Math.floor(Math.random() * (10 - 1 + 1) + 1);

  num_left.value = num1;
  num_right.value = num2;

  const equations = ["+", "-", "/", "*"];

  const SCORE_POINTS = 1;
  const MAX_SCORE_PER_LEVEL = 5;

  function startGame() {
    levelCounter = 1;
    scores = 0;
    wrong = 0;
    correct = 0;
    counter = 0;
    getRandomEquation();
  }

  function calculateNum() {
    if (levelCounter === 1) {
      num1 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      num2 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      num_left.value = num1;
      num_right.value = num2;
    } else if (levelCounter === 2) {
      levelCounter = 2;
      num1 = Math.floor(Math.random() * (30 - 11 + 1) + 11);
      num2 = Math.floor(Math.random() * (30 - 11 + 1) + 11);
      num_left.value = num1;
      num_right.value = num2;
    } else if (levelCounter === 3) {
      levelCounter = 3;
      num1 = Math.floor(Math.random() * (50 - 31 + 1) + 31);
      num2 = Math.floor(Math.random() * (50 - 31 + 1) + 31);
      num_left.value = num1;
      num_right.value = num2;
    } else if (levelCounter === 4) {
      levelCounter = 4;
      num1 = Math.floor(Math.random() * (70 - 51 + 1) + 51);
      num2 = Math.floor(Math.random() * (70 - 51 + 1) + 51);
      num_left.value = num1;
      num_right.value = num2;
    } else {
      levelCounter = "Advanced";
      num1 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
      num2 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
      num_left.value = num1;
      num_right.value = num2;
    }
  }

  function getRandomEquation() {
    const questionIndex =
      equations[Math.floor(Math.random() * equations.length)];
    progressText.innerText = `Level ${levelCounter}`;
    progressBarFull.style.width = `${(counter / MAX_SCORE_PER_LEVEL) * 100}%`;
    if (progressBarFull.style.width === "100%") {
      progressBarFull.style.width = "0%";
    }
    math.innerText = questionIndex;
    if (questionIndex === "+") {
      result = num1 + num2;
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
      calculateNum();
    }
  }
  function check() {
    if (answer.value == result) {
      solution.style.color = "green";
      solution.innerHTML = "Good Job! Correct! Next";
      animation.classList.add("success__score");
      correct++;
      counter++;
      incrementScore(SCORE_POINTS);
      if (counter >= 5) {
        levelCounter++;
        counter = 0;
      }
    } else {
      solution.style.color = "red";
      solution.innerHTML = `Correct Answer is ${result}! Try the next one!`;
      decrementScore(SCORE_POINTS);
      wrong++;
      if (wrong >= 1) {
        counter = 0;
      }
      animation.classList.add("fail__score");
      score_animation.classList.add("horizontal-shake");
    }
    setTimeout(() => {
      answer.value = "";
      calculateNum();
      getRandomEquation();
      animation.classList.remove("success__score");
      animation.classList.remove("fail__score");
      score_animation.classList.remove("horizontal-shake");
    }, 1000);
  }

  document.addEventListener("keydown", function (e) {
    if (isPause === false && e.key === "Enter") check();
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

  const mode = JSON.parse(localStorage.getItem("mode"));
  const practiceScores =
    JSON.parse(localStorage.getItem("practiceScores")) || [];
  const attackScores = JSON.parse(localStorage.getItem("attackScores")) || [];
  const endGame = document.getElementById("game_end");
  const username = JSON.parse(localStorage.getItem("usernames"));
  user.innerText = username;

  function saveToLocalStorage() {
    const score = {
      name: username,
      score: scores,
    };

    const recentScore = {
      name: username,
      score: scores,
      correct: correct,
      incorrect: wrong,
    };

    localStorage.setItem("recentScore", JSON.stringify(recentScore));

    if (mode === "practice") {
      if (practiceScores.length === 0) {
        practiceScores.push(score);
      }

      const exactUser = practiceScores.some((item) => item.name === username);
      if (!exactUser) {
        practiceScores.push(score);
      }

      if (practiceScores.length > 0) {
        practiceScores.map((item) => {
          if (item.name === username && item.score < scores) {
            console.log("same");
            item.score = scores;
          }
        });
      }

      practiceScores.sort((a, b) => b.score - a.score);
      practiceScores.splice(5);

      localStorage.setItem("practiceScores", JSON.stringify(practiceScores));
    } else {
      if (attackScores.length === 0) {
        attackScores.push(score);
      }

      exactUser = attackScores.some((item) => item.name === username);
      if (!exactUser) {
        attackScores.push(score);
      }

      if (attackScores.length > 0) {
        attackScores.map((item) => {
          if (item.name === username && item.score < scores) {
            item.score = scores;
          }
        });
      }

      attackScores.sort((a, b) => b.score - a.score);
      attackScores.splice(5);
      localStorage.setItem("attackScores", JSON.stringify(attackScores));
    }
  }

  endGame.addEventListener("click", (e) => {
    e.preventDefault();
    saveToLocalStorage();
    window.location.assign("endGame.html");
  });

  const pause = document.getElementById("pause");
  pause.addEventListener("click", () => {
    isPause = true;
    modal__outter.style.display = "flex";
  });

  menuEnd.addEventListener("click", () => {
    modal__outter.style.display = "none";
    saveToLocalStorage();
    window.location.assign("endGame.html");
  });

  restart.addEventListener("click", () => {
    isPause = false;
    modal__outter.style.display = "none";
  });
}
