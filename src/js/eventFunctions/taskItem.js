function TaskItemEvent(taskItemsBtnDOM, eventDOMItem) {
  taskItemsBtnDOM.forEach((taskItemBtn) => {
    if (taskItemBtn.contains(eventDOMItem)) {
      let dropdownTask = taskItemBtn.querySelector(".dropdown");
      let buttonTask = taskItemBtn.querySelector(".button__icon");

      if (!buttonTask.classList.contains("button__icon_active")) {
        dropdownTask.classList.remove("dropdown_hidden");
        buttonTask.classList.add("button__icon_active");
      } else if (!dropdownTask.contains(eventDOMItem)) {
        dropdownTask.classList.add("dropdown_hidden");
        buttonTask.classList.remove("button__icon_active");
      }
    }
  });
}

function HideTaskItem(taskItemsBtnDOM, eventDOMItem) {
  taskItemsBtnDOM.forEach((taskItemBtn) => {
    if (!taskItemBtn.contains(eventDOMItem)) {
      let dropdownTask = taskItemBtn.querySelector(".dropdown");
      let buttonTask = taskItemBtn.querySelector(".button__icon");

      if (buttonTask.classList.contains("button__icon_active")) {
        dropdownTask.classList.add("dropdown_hidden");
        buttonTask.classList.remove("button__icon_active");
      }
    }
  });
}

export { TaskItemEvent, HideTaskItem };
