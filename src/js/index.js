import "../styles/gather.scss";
import "./name";
import "./loading";
import "./logic";
import "./game";
import "./endGame";
import "./pickGame";
import "./leaderboard";
import "./practice";

if (window.location.pathname.endsWith("/index.html")) {
  localStorage.setItem("mode", JSON.stringify("practice"));
}
