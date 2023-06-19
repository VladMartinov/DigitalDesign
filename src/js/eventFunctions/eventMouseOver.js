import { checkInDOMsContain } from "@/js/checkFunctions/checkContains";
import { HideProjectItem } from "./projectItem";
import { HideTaskItem } from "./taskItem";

function EventMouseOver(eventDOMItem) {
  let projectItems = document.querySelectorAll(".project-item");
  let projectItemBtns = document.querySelectorAll(".project-item-more");

  let taskItems = document.querySelectorAll(".task-item");
  let taskItemBtns = document.querySelectorAll(".task-item-more");

  if (!checkInDOMsContain(projectItems, eventDOMItem)) {
    if (!checkInDOMsContain(projectItemBtns, eventDOMItem)) {
      HideProjectItem(projectItemBtns, eventDOMItem);
    }
  }
  if (!checkInDOMsContain(taskItems, eventDOMItem)) {
    if (!checkInDOMsContain(taskItemBtns, eventDOMItem)) {
      HideTaskItem(taskItemBtns, eventDOMItem);
    }
  }
}

export { EventMouseOver };
