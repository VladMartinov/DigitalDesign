import { createIconButton } from "../buttons";
import { checkObject } from "../js/checkFunctions/helpers";

function createTaskItem(item) {
  item = checkObject(item);

  return `<div class="container">
            <div class="task-item">
              <div class="task-item-content">
                <div class="task-item-content-row">
                  <p class="task-item-content__title text text_prim">${
                    item.title
                  }</p>

                  <div class="roject-item-content__profile profile-img">
                    <img src="${item.profileImgSrc}" alt="Profile img" />
                  </div>
                </div>

                <div class="task-item-content-info">
                  <span class="task-content-info__id text text_prim">#${
                    item.info.id
                  }</span>

                  <p class="task-content-info__text text text_disabled">
                    ${item.info.author}
                  </p>

                  <span
                    class="task-content-info__status status-item status-item_${
                      item.info.tagStatus
                    } text"
                    >${item.info.tagText}</span
                  >

                  <p class="task-content-info__user-info text text_disabled">
                    ${item.info.userChanged}
                  </p>
                </div>
              </div>

            
              <div class="task-item-more">
                <div class="task-item-more-wrapper">
                  ${createIconButton("more-icon")}

                  <div class="dropdown dropdown_hidden">
                    <button href="#" class="dropdown__button text text_prim">
                      Редактировать
                    </button>
                    <button href="#" class="dropdown__button text text_error">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

export { createTaskItem };
