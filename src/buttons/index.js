function CreateNavButton(text, href, isActive = false) {
  return `<!-- nav-link -->
          <a
            href="${href}"
            class="header__item button button__nav ${
              isActive ? "button__nav_active" : ""
            } text"
          >
            ${text}
          </a>
          <!-- //nav-link -->`;
}

function CreatePrimaryQueryButton(text, typeQuery, typeQueryMethod) {
  return `<!-- button -->
            <li class="buttons__item">
              <button
                class="button button__primary"
                data-query="${typeQuery}"
                data-querytype="${typeQueryMethod}"
              >
                ${text}
              </button>
            </li>
            <!-- //button -->`;
}

export { CreateNavButton, CreatePrimaryQueryButton };
