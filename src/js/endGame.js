if (window.location.pathname.endsWith("/endGame.html")) {
  const correct = document.getElementById("correct");
  const incorrect = document.getElementById("incorrect");

  const recentUserScore = JSON.parse(localStorage.getItem("recentScore"));

  const username = JSON.parse(localStorage.getItem("usernames"));

  correct.innerText = `Correct: ${recentUserScore.correct}`;

  incorrect.innerText = `Incorrect: ${recentUserScore.incorrect}`;

  recentScore.innerText = `Your score ${username}: ${recentUserScore.score}`;
}
