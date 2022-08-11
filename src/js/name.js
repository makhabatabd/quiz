if (window.location.pathname === "/name.html") {
  const username = document.querySelector("#username");
  const startGame = document.querySelector("#start");
  const span = document.querySelector(".username__span");
  const lastUsername = JSON.parse(localStorage.getItem("usernames"));

  username.value = lastUsername;

  function usernameValid() {
    if (username.value) {
      span.style.opacity = 0;
    } else if (!username.value) {
      span.style.opacity = 1;
    }
  }

  function start() {
    username.addEventListener("input", usernameValid);
    localStorage.setItem("usernames", JSON.stringify(username.value));
    if (!username.value) span.style.opacity = 1;
    if (username.value) {
      window.location.assign("/pickGame.html");
    }
  }

  startGame.addEventListener("click", () => {
    start();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      start();
      e.preventDefault();
    }
  });
}
