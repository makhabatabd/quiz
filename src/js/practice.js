if (window.location.pathname === "/practice.html") {
  const num_right = document.getElementById("number__right");
  const num_left = document.getElementById("number__left");
  let answer = document.getElementById("answer");
  const solution = document.getElementById("ans");
  const scoreText = document.getElementById("score");
  const math = document.getElementById("math");
  const endGame = document.getElementById("game__end");
  // const correct = document.getElementById("correct");
  // const incorrect = document.getElementById("incorrect");
  // const recentScore = document.getElementById("recentScore");
  const user = document.querySelector(".user");
  const animation = document.getElementById("score__animation");
  const score_animation = document.querySelector(".hud__item");

  let num1 = Math.floor(Math.random() * 20 + 1);
  let num2 = Math.floor(Math.random() * 20 + 1);

  let scores = 0;
  let wrong = 0;
  let questionCounter = 0;

  num_left.value = num1;
  num_right.value = num2;

  let result;

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
      getRandomEquation();
      animation.classList.remove("success__score");
      score_animation.classList.remove("horizontal-shake");
      animation.classList.remove("fail__score");
      num_right.value = num2;
      num_left.value = num1;
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

  const practiceScores =
    JSON.parse(localStorage.getItem("practiceScores")) || [];
  const username = JSON.parse(localStorage.getItem("usernames"));
  user.innerText = username;

  endGame.addEventListener("click", (e) => {
    e.preventDefault();
    const score = {
      name: username,
      score: scores,
    };

    const recentScore = {
      name: username,
      score: scores,
      correct: scores,
      incorrect: wrong,
    };

    localStorage.setItem("recentScore", JSON.stringify(recentScore));

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
    window.location.assign("/endGame.html");
  });
}
