import { checkInDOMsContain } from "../checkFunctions/checkContains";
import { NavBarEvent } from "./navBar";
import { HideNavProfile, NavProfileEvent } from "./navProfile";
import { HideProjectItem, ProjectItemEvent } from "./projectItem";
import { HideTaskItem, TaskItemEvent } from "./taskItem";

function EventClick(eventDOMItem) {
  let navDOM = document.querySelector(".header-nav");
  let navProfileDOM = document.querySelector(".header-profile");

  let projectItemBtns = document.querySelectorAll(".project-item-more");
  let taskItemBtns = document.querySelectorAll(".task-item-more");

  if (navDOM.contains(eventDOMItem)) {
    NavBarEvent(navDOM, eventDOMItem);
  } else if (navProfileDOM.contains(eventDOMItem)) {
    NavProfileEvent(navProfileDOM, eventDOMItem);
  } else if (checkInDOMsContain(projectItemBtns, eventDOMItem)) {
    ProjectItemEvent(projectItemBtns, eventDOMItem);
  } else if (checkInDOMsContain(taskItemBtns, eventDOMItem)) {
    TaskItemEvent(taskItemBtns, eventDOMItem);
  } else {
    if (navProfileDOM.classList.contains("header-profile_active")) {
      HideNavProfile(navProfileDOM);
    }
    if (!checkInDOMsContain(projectItemBtns, eventDOMItem)) {
      HideProjectItem(projectItemBtns, eventDOMItem);
    }
    if (!checkInDOMsContain(taskItemBtns, eventDOMItem)) {
      HideTaskItem(taskItemBtns, eventDOMItem);
    }
  }
}

export { EventClick };
