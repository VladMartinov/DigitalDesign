import { createPrimaryButton } from "../buttons";

function createEmptyProjects() {
  return `<section class="empty-project">
            <div class="container container_full-height">
              <div class="empty-project-info">
                <p class="empty-project-info__text text text_black">
                  Не создан ни один проект
                </p>

                ${createPrimaryButton("Добавить")}
              </div>
            </div>
          </section>`;
}

export { createEmptyProjects };
