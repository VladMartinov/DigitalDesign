function ProjectItemEvent(projectItemsBtnDOM, eventDOMItem) {
  projectItemsBtnDOM.forEach((projectItemBtn) => {
    if (projectItemBtn.contains(eventDOMItem)) {
      let dropdownProject = projectItemBtn.querySelector(".dropdown");
      let buttonProject = projectItemBtn.querySelector(".button-icon");

      if (!buttonProject.classList.contains("button-icon_active")) {
        dropdownProject.classList.remove("dropdown_hidden");
        buttonProject.classList.add("button-icon_active");
      } else if (!dropdownProject.contains(eventDOMItem)) {
        dropdownProject.classList.add("dropdown_hidden");
        buttonProject.classList.remove("button-icon_active");
      }
    }
  });
}

function HideProjectItem(projectItemsBtnDOM, eventDOMItem) {
  projectItemsBtnDOM.forEach((projectItemBtn) => {
    if (!projectItemBtn.contains(eventDOMItem)) {
      let dropdownProject = projectItemBtn.querySelector(".dropdown");
      let buttonProject = projectItemBtn.querySelector(".button-icon");

      if (buttonProject.classList.contains("button-icon_active")) {
        dropdownProject.classList.add("dropdown_hidden");
        buttonProject.classList.remove("button-icon_active");
      }
    }
  });
}

export { ProjectItemEvent, HideProjectItem };
