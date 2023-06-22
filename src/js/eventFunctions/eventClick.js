import { checkInDOMsContain } from "@/js/checkFunctions/checkContains";
import { SelectQuery } from "@/js/queryFunction/SelectQuery";

function EventClick(event) {
  let url = "http://45.12.239.156:8081/api/";

  let currentDOM = event.currentTarget;
  let buttons = currentDOM.querySelectorAll(".buttons__item");

  if (checkInDOMsContain(buttons, event.target)) {
    if (
      currentDOM.dataset.typepage == "projects" ||
      currentDOM.dataset.typepage == "tasks"
    ) {
      SelectQuery(event.target, url, currentDOM.dataset.typepage);
    } else {
      console.log("I don't know this click :(");
    }
  }
}

export { EventClick };
