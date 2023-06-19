import { createPrimaryButton } from "../buttons";

function createEmptyProjects() {
  return `<section class="empty-project">
            <div class="container container_full-height">
              <div class="empty-project__wrapper">
                <p class="empty-project__text text text_black">
                  Не создан ни один проект
                </p>

                ${createPrimaryButton("Добавить")}
              </div>
            </div>
          </section>`;
}

export { createEmptyProjects };
