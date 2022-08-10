if (window.location.pathname === "/endGame.html") {
  const correct = document.getElementById("correct");
  const incorrect = document.getElementById("incorrect");

  const attackScores = JSON.parse(localStorage.getItem("attackScores"));
  const practiceScores = JSON.parse(localStorage.getItem("practiceScores"));
  const mode = JSON.parse(localStorage.getItem("mode"));

  const username = JSON.parse(localStorage.getItem("usernames"));
  let user;

  if (mode === "practice") {
    user = practiceScores.find((item) => {
      if (username === item.name) {
        return item;
      }
    });
  } else {
    user = attackScores.find((item) => {
      if (username === item.name) {
        return item;
      }
    });
  }

  correct.innerText = `Correct: ${user.correct}`;

  incorrect.innerText = `Incorrect: ${user.incorrect}`;

  recentScore.innerText = `Your score ${username}: ${user.score}`;
}
