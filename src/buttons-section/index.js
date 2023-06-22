import { CreateButtonsList } from "@/buttons-list";

function CreateSectionButtons() {
  return `<section class="buttons">
            <div class="container">
              <ul class="buttons-rows__list">
                <!-- buttons-row -->
                <li class="buttons-rows__item">
                  <div class="buttons-rows__title">
                    <p class="text text_prim">Создать (POST)</p>
                  </div>

                  ${CreateButtonsList("post")}
                </li>
                <!-- //buttons-row -->

                <!-- buttons-row -->
                <li class="buttons-rows__item">
                  <div class="buttons-rows__title">
                    <p class="text text_prim">Получить (GET)</p>
                  </div>

                  ${CreateButtonsList("get")}
                </li>
                <!-- //buttons-row -->

                <!-- buttons-row -->
                <li class="buttons-rows__item">
                  <div class="buttons-rows__title">
                    <p class="text text_prim">Редактировать (PUT)</p>
                  </div>

                  ${CreateButtonsList("put")}
                </li>
                <!-- //buttons-row -->

                <!-- buttons-row -->
                <li class="buttons-rows__item">
                  <div class="buttons-rows__title">
                    <p class="text text_prim">Удалить (DELETE)</p>
                  </div>

                  ${CreateButtonsList("delete")}
                </li>
                <!-- //buttons-row -->
              </ul>
            </div>
          </section>`;
}

export { CreateSectionButtons };
