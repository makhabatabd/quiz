import "../styles/gather.scss";
import "./name";
import "./endGame";
import "./game";
import "./pickGame";
import "./leaderboard";
import "./practice";

if (window.location.pathname == "/index.html") {
  localStorage.setItem("mode", JSON.stringify("practice"));
}
