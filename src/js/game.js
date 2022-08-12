if (window.location.pathname === "/game.html") {
  const bell = document.querySelector("#audio");
  let modal__outter = document.querySelector(".modal__outter");
  const restart = document.getElementById("continue");
  const menuEnd = document.getElementById("menu-end-game");
  let isPause = false;

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

  function decremenT() {
    if (isPause === false) {
      const mindiv = document.querySelector(".mins");
      const secdiv = document.querySelector(".secs");

      mindiv.textContent = Math.floor(seconds / 60);
      secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
      if (circle.classList.contains("danger")) {
        circle.classList.remove("danger");
      }

      if (seconds > 0) {
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        setProgress(perc);
        seconds--;

        if (seconds < 10) {
          circle.classList.add("danger");
        }
      } else {
        mins = 0;
        seconds = 0;
        bell.play();
        setTimeout(() => {
          saveToLocalStorage();
          window.location.assign("/endGame.html");
        }, 3000);
      }
    }
    setTimeout(() => {
      decremenT();
    }, 1000);
  }
  decremenT();

  const pause = document.getElementById("pause");
  pause.addEventListener("click", () => {
    isPause = true;
    modal__outter.style.display = "flex";
  });

  menuEnd.addEventListener("click", () => {
    modal__outter.style.display = "none";
    window.location.assign("/endGame.html");
  });

  restart.addEventListener("click", () => {
    isPause = false;
    modal__outter.style.display = "none";
  });
}
