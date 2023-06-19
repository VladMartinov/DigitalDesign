import "./register.js";
import "@/scss/style.scss";
import authorProfileImg from "@/assets/images/profile-img.jpg";
import { LoadComponent } from "./loadComponents.js";
import { EventClick } from "./eventFunctions/eventClick.js";
import { EventMouseOver } from "./eventFunctions/eventMouseOver.js";

function initApp() {
  let projectItem = {
    title: "Название",
    info: {
      id: "1",
      author: "Иванов И.И. создал(а) 1 час назад",
      userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
    },
  };

  let taskItem = {
    title: "Название",
    profileImgSrc: authorProfileImg,
    info: {
      id: "1",
      author: "Иванов И.И. создал(а) 1 час назад",
      tagStatus: "draft",
      tagText: "Черновик",
      userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
    },
  };

  let app = document.querySelector(".app");

  LoadComponent(app, projectItem, taskItem);

  app.addEventListener("click", function (event) {
    let currentItem = event.target;

    EventClick(currentItem);
  });

  app.addEventListener("mouseover", function (event) {
    let currentItem = event.target;

    EventMouseOver(currentItem);
  });
}

initApp();
