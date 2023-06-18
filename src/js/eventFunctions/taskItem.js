function TaskItemEvent(taskItemsBtnDOM, eventDOMItem) {
  taskItemsBtnDOM.forEach((taskItemBtn) => {
    if (taskItemBtn.contains(eventDOMItem)) {
      let dropdownTask = taskItemBtn.querySelector(".dropdown");
      let buttonTask = taskItemBtn.querySelector(".button-icon");

      if (!buttonTask.classList.contains("button-icon_active")) {
        dropdownTask.classList.remove("dropdown_hidden");
        buttonTask.classList.add("button-icon_active");
      } else if (!dropdownTask.contains(eventDOMItem)) {
        dropdownTask.classList.add("dropdown_hidden");
        buttonTask.classList.remove("button-icon_active");
      }
    }
  });
}

function HideTaskItem(taskItemsBtnDOM, eventDOMItem) {
  taskItemsBtnDOM.forEach((taskItemBtn) => {
    if (!taskItemBtn.contains(eventDOMItem)) {
      let dropdownTask = taskItemBtn.querySelector(".dropdown");
      let buttonTask = taskItemBtn.querySelector(".button-icon");

      if (buttonTask.classList.contains("button-icon_active")) {
        dropdownTask.classList.add("dropdown_hidden");
        buttonTask.classList.remove("button-icon_active");
      }
    }
  });
}

export { TaskItemEvent, HideTaskItem };
