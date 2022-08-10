if (window.location.pathname === "/pickGame.html") {
  const practice = document.querySelector(".practice");
  const time_attack = document.querySelector(".time__attack");

  time_attack.addEventListener("click", () => {
    window.location.assign("/game.html");
    localStorage.setItem("mode", JSON.stringify("time__attack"));
  });

  practice.addEventListener("click", () => {
    window.location.assign("/practice.html");
    localStorage.setItem("mode", JSON.stringify("practice"));
  });
}