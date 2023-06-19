function NavBarEvent(navBarDOM, eventDOMItem) {
  let activeNavBtn = navBarDOM.querySelector(".button__nav_active");

  if (activeNavBtn && activeNavBtn != eventDOMItem) {
    activeNavBtn.classList.remove("button__nav_active");
    eventDOMItem.classList.add("button__nav_active");
  }
}

export { NavBarEvent };
