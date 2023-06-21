import { CreateNavButton } from "@/buttons";

function CreateNavBar(pageNavArr) {
  return `<header class="header">
            <div class="container">
              <div class="header__wrapper">
                <nav class="header__nav">
                  ${CreateNavButton("Проекты", "./index.html", pageNavArr[0])}
                  ${CreateNavButton("Задачи", "./tasks.html", pageNavArr[1])}
                </nav>
              </div>
            </div>
          </header>`;
}

export { CreateNavBar };
