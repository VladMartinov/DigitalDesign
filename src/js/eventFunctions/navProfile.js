function NavProfileEvent(navProfileDOM, eventDOMItem) {
  let dropdownNavProfileDOM = navProfileDOM.querySelector(".dropdown");

  if (!navProfileDOM.classList.contains("header-profile_active")) {
    navProfileDOM.classList.add("header-profile_active");
    dropdownNavProfileDOM.classList.remove("dropdown_hidden");
  } else if (!dropdownNavProfileDOM.contains(eventDOMItem)) {
    navProfileDOM.classList.remove("header-profile_active");
    dropdownNavProfileDOM.classList.add("dropdown_hidden");
  }
}

function HideNavProfile(navProfileDOM) {
  let dropdownNavProfileDOM = navProfileDOM.querySelector(".dropdown");

  navProfileDOM.classList.remove("header-profile_active");
  dropdownNavProfileDOM.classList.add("dropdown_hidden");
}

export { NavProfileEvent, HideNavProfile };
