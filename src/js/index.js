import "../styles/gather.scss";
import "./name";
import "./game";
import "./endGame";
import "./pickGame";
import "./leaderboard";
import "./practice";

if (window.location.pathname == "/index.html") {
  localStorage.setItem("mode", JSON.stringify("practice"));
}
