function NavBarEvent(navBarDOM, eventDOMItem) {
  let activeNavBtn = navBarDOM.querySelector(".button-nav_active");

  if (activeNavBtn && activeNavBtn != eventDOMItem) {
    activeNavBtn.classList.remove("button-nav_active");
    eventDOMItem.classList.add("button-nav_active");
  }
}

export { NavBarEvent };
