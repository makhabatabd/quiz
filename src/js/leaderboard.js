if (window.location.pathname === "/leaderboard.html") {
  const highScoresList = document.querySelector("#high-scores-list");
  const attackScores = JSON.parse(localStorage.getItem("attackScores")) || [];
  const practiceScores =
    JSON.parse(localStorage.getItem("practiceScores")) || [];
  const btn = document.getElementById("board");
  let mode = JSON.parse(localStorage.getItem("mode"));

  function attack() {
    highScoresList.innerHTML = attackScores
      .map((item) => {
        return `<li class="high-score">${item.name} - ${item.score}</li>`;
      })
      .join("");
    localStorage.setItem("mode", JSON.stringify("time__attack"));
    mode = JSON.parse(localStorage.getItem("mode"));
    btn.removeEventListener("click", attack);
    btn.addEventListener("click", practice);
  }

  function practice() {
    highScoresList.innerHTML = practiceScores
      .map((item) => {
        return `<li class="high-score">${item.name} - ${item.score}</li>`;
      })
      .join("");
    localStorage.setItem("mode", JSON.stringify("practice"));
    mode = JSON.parse(localStorage.getItem("mode"));
    btn.removeEventListener("click", practice);
    btn.addEventListener("click", attack);
  }

  function btnHandler() {
    mode === "practice" ? practice() : attack();
  }

  btnHandler();
}
