import { checkText } from "../js/checkFunctions/helpers";

function createNavButton(text, active = false) {
  let textVerif = checkText(text);

  return `<button class="header-nav__item button button-nav 
            ${active ? "button-nav_active" : ""} text">
            ${textVerif}
          </button>`;
}

function createPrimaryButton(text) {
  let textVerif = checkText(text);

  return `<button class="button button-primary">${textVerif}</button>`;
}

function createIconButton(nameSvgImage) {
  return `<button class="button button-icon">
            <svg
              width="24"
              height="24"
            >
              <use xlink:href="#${nameSvgImage}" />
            </svg>
          </button>`;
}

export { createNavButton, createPrimaryButton, createIconButton };
