import { CreateSectionButtons } from "@/buttons-section";
import { CreateNavBar } from "@/navigation";

function LoadComponent(app) {
  let navHtml;
  if (app.dataset.typepage === "projects") {
    navHtml = CreateNavBar([true, false]);
  } else {
    navHtml = CreateNavBar([false, true]);
  }
  app.insertAdjacentHTML("beforeend", navHtml);
  
  let sectionButtons = CreateSectionButtons();
  app.insertAdjacentHTML("beforeend", sectionButtons);
}

export { LoadComponent };
