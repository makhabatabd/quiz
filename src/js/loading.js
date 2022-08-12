if (window.location.pathname === "/loading.html") {
  const loaderSeconds = document.querySelector(".game-start span");
  const mode = JSON.parse(localStorage.getItem("mode"));
  const text = document.getElementById("game-start__text");

  let seconds = 2;
  let intervalId = setInterval(() => {
    if (seconds === 0) {
      clearInterval(intervalId);
      loaderSeconds.style.display = "none";
      text.style.display = "block";
    }
    loaderSeconds.innerText = seconds;
    seconds--;
  }, 1000);

  setInterval(() => {
    if (mode === "practice") {
      window.location.assign("/practice.html");
    } else {
      window.location.assign("/game.html");
    }
  }, 4000);
}
