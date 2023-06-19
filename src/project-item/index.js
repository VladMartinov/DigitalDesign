import { createIconButton } from "../buttons";
import { checkObject } from "../js/checkFunctions/helpers";

function createProjectItem(item) {
  item = checkObject(item);

  return `<div class="container">
            <div class="project-item">
              <div class="project-item-content">
                <div class="project-item__title">
                  <p class="text text_prim">${item.title}</p>
                </div>

                <div class="project-item-content-info">
                  <span class="project-content__id text text_prim">#${
                    item.info.id
                  }</span>

                  <p class="project-content__text text text_disabled">
                    ${item.info.author}
                  </p>
                  <p class="project-content__user-info text text_disabled">
                    ${item.info.userChanged}
                  </p>
                </div>
              </div>

              <div class="project-item-more">
                <div class="project-item-more__wrapper">
                  ${createIconButton("more-icon")}

                  <div class="dropdown dropdown_hidden">
                    <button class="dropdown__button text text_prim">
                      Редактировать
                    </button>
                    <button class="dropdown__button text text_error">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

export { createProjectItem };
