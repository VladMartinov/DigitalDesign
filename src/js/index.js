import "./register.js";
import "@/scss/style.scss";
import { LoadComponent } from "./loadComponents.js";
import { EventClick } from "./eventFunctions/eventClick.js";

function initApp() {
  let app = document.querySelector(".app");

  LoadComponent(app);

  app.addEventListener("click", function (event) {
    EventClick(event);
  });
}

initApp();
