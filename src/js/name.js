if (window.location.pathname === "/name.html") {
  const username = document.querySelector("#username");
  const startGame = document.querySelector("#start");
  const span = document.querySelector(".username__span");

  function usernameValid() {
    if (username.value) {
      span.style.opacity = 0;
    } else if (!username.value) {
      span.style.opacity = 1;
    }
  }

  startGame.addEventListener("click", () => {
    console.log(1);
    username.addEventListener("input", usernameValid);
    localStorage.setItem("usernames", JSON.stringify(username.value));

    if (!username.value) span.style.opacity = 1;
    if (username.value) {
      window.location.assign("/pickGame.html");
      username.removeEventListener("input", usernameValid);
    }
  });
}
