import { createNavButton } from "../buttons";
import ProfileImg from "@/assets/images/profile-img.jpg";

function createNavBar() {
  return `<header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header-nav">
            ${createNavButton("Проекты", true)}
            ${createNavButton("Задачи")}
            ${createNavButton("Пользователи")}
          </nav>

          <div class="header-profile">
            <div class="header-profile__img profile-img">
              <img src="${ProfileImg}" alt="Profile image" />
            </div>

            <button class="header-profile__button">
              <svg
                width="24"
                height="24"
              >
                <use xlink:href="#arrow-bottom" />
              </svg>
            </button>

            <div class="dropdown dropdown_hidden">
              <a href="#" class="dropdown__button text text_prim">Профиль</a>
              <a href="#" class="dropdown__button text text_prim">Выход</a>
            </div>
          </div>
        </div>
      </div>
    </header>`;
}

export { createNavBar };
